import { Router } from "express";
import multer from 'multer';
import UsuariosController from "../controllers/usuarios.js";
import { encryptPassword } from "../utils/handleEncrypt.js";

const router = Router();

const storage = multer.diskStorage({
  destination: './public/img/avatar',
  filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password } = body;

    console.log("email", email);
    const users = UserController.get();
    //console.log("usuarios:", users);
    //const user = await  UserModel.findOne({ email });
    const user = await UsuariosController.obtener({ email });
    console.log("usuario encontrado:", user);
    if (user) {
      res
        .cookie(
          "data",
          JSON.stringify({
            mensaje: `Usuario ${email} ya se encuentra registrado.`,
            isError: true,
          }),
          { maxAge: 2000, signed: true }
        )
        .redirect("/sign-up");
      return;
    }

    const newUser = {
      ...body,
      password: encryptPassword(password),
    };
    await UsuariosController.crear(newUser);
    //const userResult = await UserController.create(newUser);
    res.redirect("/sign-in");
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { query = {} } = req;
    //const users = await UserController.get(query);
    const users = await UsuariosController.obtener(query);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default router;
