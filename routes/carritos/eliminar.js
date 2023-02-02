import { Router } from 'express'
import validarCarritoExiste from '../../middlewares/validar-carrito-existe.js'
import CarritosController from '../../controllers/carritos.js'
import STATUS_CODE  from '../../utils/statusCode.js'
import { BadRequestError } from '../../utils/errorHandler.js'
const router = Router()

router.delete('/:id',validarCarritoExiste, async (req, res, next) => {
  try {
    await CarritosController.eliminarPorId(req.params.id)
    res.status(STATUS_CODE.NO_CONTENT).end()
  } catch (error) {
    next(error)
  }
})

router.delete('/:id/productos/:id_prod',validarCarritoExiste, async (req, res, next) => {
    try {
      const prop = [    
        'productos'   
      ]
      await CarritosController.eliminarProductoCarrito(req.params.id,req.params.id_prod,prop)
      res.status(STATUS_CODE.NO_CONTENT).end()
    } catch (error) {          
      next(new BadRequestError(`Ocurrio un error: ${error.message}`, error))   
    }
  })

export default router