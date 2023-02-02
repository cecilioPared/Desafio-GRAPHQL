import { Router } from 'express'
import validarUsuario from '../../middlewares/validar-usuario.js'
import validarCarrito from '../../middlewares/validar-carrito.js'
import CarritosController from '../../controllers/carritos.js'
import validarProductoCarrito  from '../../middlewares/validar-producto-carrito.js'
import validarCarritoExiste from '../../middlewares/validar-carrito-existe.js'
import STATUS_CODE  from '../../utils/statusCode.js'
import { BadRequestError } from '../../utils/errorHandler.js'
const router = Router()

router.post('/',validarUsuario, validarCarrito, async (req, res, next) => {
  try {

    
    let { body: data } = req;
    const timestamp = new Date()        
    const idCarrito = await CarritosController.crear({ timestamp, ...data })
    
    res.status(STATUS_CODE.CREATED).json(idCarrito)
  } catch (error) {
    next(error)
  }
})

router.post('/:id/productos',validarCarritoExiste, validarProductoCarrito, async (req, res, next) => {
  try {
    const prop = [    
      'productos'   
    ]
    const idCarrito = await CarritosController.agregarProductoCarrito(req.params.id, req.body,prop)
    res.status(STATUS_CODE.CREATED).json(idCarrito)
  } catch (error) {
    next(new BadRequestError(`Ocurrio un error: ${error.message}`, error))   
  }
})

export default router