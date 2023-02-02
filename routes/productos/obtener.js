import { Router } from 'express'
import ProductosController from '../../controllers/productos.js'
import {NotFoundError }  from '../../utils/errorHandler.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const productos = await ProductosController.obtener()
    res.json(productos)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {    
    const producto = await ProductosController.obtenerPorId(req.params.id)
    res.json(producto)
  } catch (error) {
    next(new NotFoundError(`Ocurrio un error: ${error.message}`, error))       
  }
})

export default router