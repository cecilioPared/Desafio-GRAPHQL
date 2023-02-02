import local_strategy from "passport-local";
import { isValidPassword } from "../utils/handleEncrypt.js";
import UsuariosController from "../controllers/usuarios.js";
import { encryptPassword } from "../utils/handleEncrypt.js";
import logger from "../utils/loggerHandler.js";
import sendMail from '../utils/emailHandler.js' 

const LocalStrategy = local_strategy.Strategy;

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = async (email, password, done) => {
  await UsuariosController.obtenerPorCriterio({ email })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      if (!isValidPassword(password, user.password)) {
        logger.warn(`Datos ingresados del usuario ${email} incorrectos.`);
        return done(null, false);
      }
      done(null, user);
    })
    .catch((error) => {
      done(error);
    });
};

const registerCallback = async (req, email, password, done) => {
  console.log("request", req.body);
  await UsuariosController.obtenerPorCriterio({ email })
    .then(async (user) => {
      if (user) {
        logger.error(`Usuario ${email} ya se encuentra registrado.`);
        return done(null, false);
      }
      const newUser = {
        ...req.body,
        avatar: `../img/avatar/${req.filename}`,
        password: encryptPassword(password),
      };
      return await UsuariosController.crear(newUser);
    })
    .then((newUser) => {
      if (newUser) {
        logger.info(`Usuario ${newUser.email} registrado correctamente.`);

        sendMail(
          'Nuevo registro de usuario',
          `<div>
            <h1>Datos Nuevo Usuario</h1>
            <ul>
            <li>Email:${newUser.email}</li>
            <li>Nombre:${newUser.nombre}</li>
            <li>Direccion:${newUser.direccion}</li>
            <li>Telefono:${newUser.telefono}</li>
            <li>Edad:${newUser.edad}</li>
            <li>Avatar:${newUser.avatar}</li>                        
            </ul></div>`
        );

        done(null, newUser);
      } else {
        logger.warm(newUser);
        throw new Error("Usuario ya existe");
      }
    })
    .catch((error) => {
      logger.error("Error en metodo sign-up", error.message);
      done(error);
    });
};

const authenticateUser = (passport) => {
  passport.use("sign-in", new LocalStrategy(customFields, verifyCallback));

  passport.use(
    "sign-up",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      registerCallback
    )
  );

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser((_id, done) =>
    UsuariosController.obtenerPorId(_id)
      .then((user) => done(null, user))
      .catch((err) => done(err))
  );
};

export default authenticateUser;
