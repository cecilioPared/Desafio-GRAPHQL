import { Router } from 'express'
import validarUsuario from '../../middlewares/validar-usuario.js'
import validarProductos from '../../middlewares/validar-producto.js'
import validarProductoExiste from '../../middlewares/validar-producto-existe.js'
import ProductosController from '../../controllers/productos.js'
import STATUS_CODE  from '../../utils/statusCode.js'
const router = Router()

router.put('/:id',validarUsuario, validarProductos,validarProductoExiste, async (req, res, next) => {
  try {
    const prop = [
          'nombre',
          'nombre',
          'codigo',
          'foto',
          'precio',
          'stock',      
        ]
    await ProductosController.actualizarPorId(req.params.id, req.body,prop)
    res.status(STATUS_CODE.NO_CONTENT).end()
  } catch (error) {
    next(error)
  }
})

export default router