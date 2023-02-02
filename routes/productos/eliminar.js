import { Router } from 'express'
import validarUsuario from '../../middlewares/validar-usuario.js'
import validarProductoExiste from '../../middlewares/validar-producto-existe.js'
import ProductosController from '../../controllers/productos.js'
import STATUS_CODE  from '../../utils/statusCode.js'
const router = Router()

router.delete('/:id',validarUsuario,validarProductoExiste, async (req, res, next) => {
  try {
    await ProductosController.eliminarPorId(req.params.id)
    res.status(STATUS_CODE.NO_CONTENT).end()
  } catch (error) {
    next(error)
  }
})

export default router