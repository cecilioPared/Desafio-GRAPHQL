import { Router } from 'express'
import obtener  from './obtener.js'
import crear  from './crear.js'
import eliminar  from './eliminar.js'

const router = Router()

router.use('/', crear,eliminar,obtener)

export default router