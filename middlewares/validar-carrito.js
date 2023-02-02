import Joi from 'joi'
import { BadRequestError } from '../utils/errorHandler.js'

const carritoEsquema = Joi.object({
  productos: Joi.array()    
    .required(),
  })

export default async function validarCarritoMiddleware(req,res, next) {
  const log  = '[validarCarritoMiddleware]'
  try {
    console.log(`${log} intentando validar carrito...`)
    req.body = await carritoEsquema.validateAsync(req.body)
    console.log(`${log} validación de carrito exitosa.`)
    next()
  } catch (error) {
    console.error(`${log} validación fallida del carrito a registrar: ${error.message}`)    
    next(new BadRequestError(`Ocurrio un error validando carrito: ${error.message}`, error))
  }
}