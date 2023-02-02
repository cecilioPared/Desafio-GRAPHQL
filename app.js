import express from 'express'
import session from 'express-session'
import passport from 'passport'
import path from "path";
import cluster from 'cluster';
import os from 'os';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import hbs from "hbs";
import routers from './routes/index.js'
import viewRouter from './routes/view.js';

import { errorHandler } from './utils/errorHandler.js'
import validarRecurso  from './middlewares/validar-ruta.js'
import  authenticateUser from './middlewares/passport.js'
import logger from './utils/loggerHandler.js'

const modoCluster = process.env.MODO_CLUSTER;

if (modoCluster === 'true' && cluster.isPrimary) {
      for (let i = 0; i < os.cpus().length; i++) {
            cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
            logger.info(
                  `worker ${worker.process.pid} | code ${code} | signal ${signal}`
            );
            logger.info('Starting a new worker...');
            cluster.fork();
      });
} 
else {
const app = express()

authenticateUser(passport)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", hbs.__express);

app.use(cookieParser(process.env.SECRET));
app.use(session({
  secret: process.env.SECRET,
  resave: false, 
  saveUninitialized: false,
}));
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', routers)
app.use("/", viewRouter)

app.use(errorHandler)
app.use(validarRecurso)

const PORT = process.env.NODE_PORT || 3000
const ENV = process.env.NODE_ENV

const server = app.listen(PORT, () => {
    logger.info(
      `Servidor http esta escuchando en el puerto ${server.address().port}`
    );
    logger.info(`http://localhost:${server.address().port}`);
    logger.info(`Environment:${ENV}`);
  });
  
  server.on("error", (error) => logger.error(`Error en servidor ${error}`));
}