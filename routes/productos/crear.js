import { Router } from 'express'
import validarUsuario from '../../middlewares/validar-usuario.js'
import validarProductos from '../../middlewares/validar-producto.js'
import ProductosController from '../../controllers/productos.js'
import STATUS_CODE  from '../../utils/statusCode.js'
const router = Router()

router.post('/',validarUsuario,validarProductos, async (req, res, next) => {
  try {
    let { body: data } = req;
    const timestamp = new Date()            
    const idProducto = await ProductosController.crear({ timestamp, ...data })
    res.status(STATUS_CODE.CREATED).json(idProducto)
  } catch (error) {
    next(error)
  }
})

export default router