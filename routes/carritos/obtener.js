import { Router } from 'express'
import CarritosController from '../../controllers/carritos.js'
import validarCarritoExiste from '../../middlewares/validar-carrito-existe.js'
import { NotFoundError } from '../../utils/errorHandler.js'
const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const carritos = await CarritosController.obtener()
    res.json(carritos)
  } catch (error) {
    next(error)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const carrito = await CarritosController.obtenerPorId(req.params.id)
    res.json(carrito)
  } catch (error) {    
    next(new NotFoundError(`Ocurrio un error: ${error.message}`, error))   
  }
})

router.get('/:id/productos',validarCarritoExiste, async (req, res, next) => {
  try {    
    const productos = await CarritosController.obtenerProductosCarrito(req.params.id)
    res.json(productos)
  } catch (error) {    
    next(new NotFoundError(`Ocurrio un error: ${error.message}`, error))       
  }
})

export default router