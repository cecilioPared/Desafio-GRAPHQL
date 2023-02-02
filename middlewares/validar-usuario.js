
import { UnauthorizedError }  from '../utils/errorHandler.js'

export default function validarUsuarioAdminMiddleware(req,res, next) {
  const log  = '[validarUsuarioAdmin]'
  try {
    console.log(`${log} intentando validar permiso de usuario..`)
    if (req.header("role") !== "admin"){          
        throw new error('El usuario no posee los permisos de acceso a la operación')
    }        
    next()
  } catch (error) {
    console.error(`${log} validación fallida de permiso de usuario: ${error.message}`)
    next(new UnauthorizedError('El usuario no posee los permisos de acceso a la operación', error))
  }
}