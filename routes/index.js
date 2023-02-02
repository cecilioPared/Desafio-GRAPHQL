import { Router } from 'express'
import routerCarritos  from './carritos/index.js'
import routerProductos  from './productos/index.js'
import users from "./users.js";
import auth from "./auth.js";


const router = Router()
router.use('/carrito',routerCarritos)
router.use('/productos',routerProductos)
router.use("/users", users);
router.use("/auth", auth);

export default router
