import { promises as fs} from 'fs'
import { uuid } from 'uuidv4'
import { default as pick } from 'lodash/pick.js';
import  config  from '../config.js'

class ContenedorArchivo {
    constructor(path){
        this.path = `${config.fileSystem.path}/${path}`
    }

    async obtenerPorId(id){
      try {
        
        const objs = await this.obtener()
        const findObj = objs.find(
            (o) => String(o._id) === String(id)
          );
          if (!findObj) 
            throw new Error(`id ${id} no encontrado.`);          
        return findObj
      } catch (error) {        
          throw new Error(error.message);          
      }
        
    }

    async obtener(){      
        try{
          console.log(`intentando leer archivo desde path ${this.path}`);          
            const objs = await fs.readFile(this.path,'utf-8')                             
            return JSON.parse(objs)
        }catch (error){         
          return [];
        }        
    }

    async crear(obj){
       
        try {
            const data = await this.obtener()
            const _id = uuid()            
            data.push({ _id, ...obj })
            
            await fs.writeFile(
                this.path,
                JSON.stringify(data, null, 2),
                "utf-8"
              );
            return _id;
          } catch (error) {
            console.log("Ocurrio un error durante la operación:", error)
            throw new Error(error.message)
          }
    }

    async actualizarPorId(id, obj,prop) {    
        try {
       
        const objs = await this.obtener()     
        const updateObj = objs.find(
          (o) => String(o._id) === String(id)
        );        
        const data = {
          ...pick(obj, prop),
          fechaAuditoria: new Date()
        }
         Object.assign(updateObj, data)    
        
         await fs.writeFile(
            this.path,
            JSON.stringify(objs, null, 2),
            "utf-8"
        );

        } catch (error) {      
          throw new Error(error.message);
        }
    }

      async eliminarPorId(id) {    
        try {
         const objs = await this.obtener()     
             const index = objs.findIndex((o) => {
               return String(o._id) === String(id);
             });
             console.log('indice a eliminar',index)
             if (index === -1) {
               throw new Error(`elemento con id ${id} no encontrado.`)
             }
             objs.splice(index, 1);
             await fs.writeFile(
                 this.path,
                 JSON.stringify(objs, null, 2),
                 "utf-8"
             );
        } catch (error) {
            throw new Error(`Error al eliminar ${error.message}`)
        }        
    }
}

export default ContenedorArchivo