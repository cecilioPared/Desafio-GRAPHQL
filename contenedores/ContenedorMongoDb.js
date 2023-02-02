import mongoose from 'mongoose'
import  config  from '../config.js'
import { default as pick } from 'lodash/pick.js';

await mongoose.connect(config.mongoDB.URI)

class ContenedorMongoDb {
    constructor(modelName,schema){
        this.collection = mongoose.model(modelName, schema)
    }

    async obtenerPorId(id){
        try {
            console.log('intentando buscar elemento  mongodb',id);
            
            const obj = await this.collection.findOne({ _id: id })
            console.log('elemento encontrado mongodb 2',obj);
            if (!obj) {
                throw new Error(`id ${id} no encontrado.`);         
            }
            return obj
        } catch (error) {
            console.log('ocurrio un error mongo', error.message)
            throw new Error(error.message)      
        }          
    }

    async obtener(query = {}) {
        const criterio = query
        try {
            const cursor = await this.collection.find(criterio)            
            const result = []
            cursor.forEach((obj) => {
              result.push(obj)
            })
            return result
        } catch (error) {
            throw new Error(error.message)      
        }  
    }

    async obtenerPorCriterio(query = {}){
        const criterio = query
        try {
            console.log('intentando buscar elemento  mongodb',query);
            
            const obj = await this.collection.findOne(criterio)
            console.log('elemento encontrado mongodb',obj);
            if (!obj) {
                //throw new Error(`criterio ${criterio} no encontrado.`);         
                return null
            }
            return obj
        } catch (error) {
            console.log('ocurrio un error mongo', error.message)
            throw new Error(error.message)      
        }          
    }

    async crear(obj){
        try {
            const result = await this.collection.create(obj)
            return result
        } catch (error) {
            throw new Error(error.message)      
        }  
    }

    async actualizarPorId(id, obj,prop) {    
        try {
            const objUpdate = await this.obtenerPorId(id)           
            const data = {
              ...pick(obj, prop),
              fechaAuditoria: new Date()
            }
            return this.collection.updateOne({ _id: objUpdate._id }, { $set: data })
        } catch (error) {
            throw new Error(error.message)    
        }    
    }

    async eliminarPorId(id) {    
    try {
        return this.collection.deleteOne({ _id: id })
    } catch (error) {
        throw new Error(error.message)    
    }  
    }
}

export default ContenedorMongoDb