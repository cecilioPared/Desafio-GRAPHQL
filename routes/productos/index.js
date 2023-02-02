import { Router } from 'express'
import obtener  from './obtener.js'
import crear  from './crear.js'
import actualizar  from './actualizar.js'
import eliminar  from './eliminar.js'

const router = Router()
router.use('/',crear,obtener,actualizar,eliminar)

export default router