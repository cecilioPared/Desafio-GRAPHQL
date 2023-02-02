import ProductosController from '../controllers/productos.js'
import { NotFoundError } from '../utils/errorHandler.js'

export default async function validadorProductoExisteMiddleware(req, res, next) {
  const log = '[validadorProductoExisteMiddleware]'
  const productoId = req.params.id
  try {
    console.log(`${log} intentando obtener producto ${productoId}...`)
    req.producto = await ProductosController.obtenerPorId(productoId)
    console.log(`${log} validación exitosa de producto ${productoId}.`)
    next()
  } catch (error) {
    console.error(`${log} validación fallida de producto ${productoId}: ${error.message}`)
    next(new NotFoundError(`Ocurrio un error validando producto ${error.message}`, error))    
  }
}