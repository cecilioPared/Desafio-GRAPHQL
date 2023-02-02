import { NotFoundError } from '../utils/errorHandler.js'
import CarritosController from '../controllers/carritos.js'

export default async function validadorCarritoExisteMiddleware(req, res, next) {
  const log = '[validadorCarritoExisteMiddleware]'
  const carritoId = req.params.id
  try {
    console.log(`${log} intentando obtener carrito ${carritoId}...`)
    req.carrito = await CarritosController.obtenerPorId(carritoId)
    console.log(`${log} validación exitosa de carrito ${carritoId}.`)
    next()
  } catch (error) {
    console.error(`${log} validación fallida de carrito ${carritoId}: ${error.message}`)
   next(new NotFoundError(`Ocurrio un error validando carrito: ${error.message}`, error))
  }
}