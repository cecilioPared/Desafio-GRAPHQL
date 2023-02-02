
export default function validarRecursoMiddleware(req,res, next) {
    
    let error = new Error()
    error.status = 404
    error.message = 'Recurso no encontrado'
    error.description = `Ruta: ${req.path} metodo: ${req.method} no implementado`
    res.status(404).json(error)    
    next()  
}