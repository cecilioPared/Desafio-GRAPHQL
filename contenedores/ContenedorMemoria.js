import { uuid } from 'uuidv4'
import { default as pick } from 'lodash/pick.js';
class ContenedorMemoria {
    constructor(){
      this.elements = []
    }

    async obtenerPorId(id){        
        const findObj = this.elements.find(
            (o) => String(o._id) === String(id)
          );
          if (!findObj) 
            throw new Error(`id ${id} no encontrado.`);          
        return findObj
    }

    async obtener(){      
      console.log('elementos encontrados',this.elements);
      return [...this.elements]
    }

    async crear(obj){
       
        try {
            const data = await this.obtener();
            const _id = uuid();            
            this.elements.push({ _id, ...obj });
                        
            return _id;
          } catch (error) {
            console.log("Ocurrio un error durante la operación:", error);
            throw new Error(error.message);
          }
    }

    async actualizarPorId(id, obj,prop) {    
        try {               
        const updateObj = this.elements.find(
          (o) => String(o._id) === String(id)
        );
        
        const data = {
          ...pick(obj, prop),
          fechaAuditoria: new Date()
        }
         Object.assign(updateObj, data)    


        } catch (error) {      
          throw new Error(error.message);
        }
    }

      async eliminarPorId(id) {    
        try {         
             const index = this.elements.findIndex((o) => {
               return String(o._id) === String(id);
             });
             console.log('indice a eliminar',index)
             if (index === -1) {
               throw new Error(`elemento con id ${id} no encontrado.`);
             }
             this.elements.splice(index, 1);           
        } catch (error) {
            throw new Error(`Error al eliminar erro ${error.message}`);
        }        
    }
}

export default ContenedorMemoria