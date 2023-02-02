
import { Schema } from 'mongoose'

import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {     
        super('Producto', new Schema({            
          nombre: { type: String, require: true },
          descripcion: { type: String, require: true },
          codigo: { type: String, require: true },
          foto: { type: String, require: true },
          precio: { type: Number, require: true },
          stock: { type: Number, require: true },
          timestamp: {type: Date, require: true },
          fechaAuditoria: {type: Date},
        }))
    }
}

export default ProductosDaoMongoDb
