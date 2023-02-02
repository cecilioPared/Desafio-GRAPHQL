import FirebaseAdmin from 'firebase-admin'
import { v4 as uuidv4 } from 'uuid'
import { readFile } from 'fs/promises'
import { default as pick } from 'lodash/pick.js';

const cert = JSON.parse(
  await readFile(
    new URL(process.env.FIREBASE_PATH, import.meta.url)
  )
)

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(cert)
})

console.log('Conexion exitosa a Firebase!')

class ContenedorFireBaseDb {
    constructor(modelName){
        this.model = modelName
    }

    async obtenerPorId(id){
        try {
            console.log('intentando buscar elemento firebase',id);
            
            const db = FirebaseAdmin.firestore()
            const query = db.collection(this.model)
            const doc = query.doc(id)
            const item = await doc.get()
            const obj = item.data()
            
            console.log('elemento encontrado firebase',obj);
            if (!obj) {
                throw new Error(`id ${id} no encontrado.`);         
            }
            return obj
        } catch (error) {
            console.log('ocurrio un error firebase', error.message)
            throw new Error(error.message)      
        }          
    }

    async obtener() {
        const db = FirebaseAdmin.firestore()
        try {
            const query = db.collection(this.model)
            const querySnapshot = await query.get()
            let docs = querySnapshot.docs
            const result = docs.map(doc => ({ _id: doc._id, ...doc.data() }))            
            return result
        } catch (error) {
            throw new Error(error.message)      
        }  
    }

    async crear(obj){
        try {            
            const db = FirebaseAdmin.firestore()
            const query = db.collection(this.model)
            let _id = uuidv4()
            let doc = query.doc(_id)
            const result = await doc.create( {_id,...obj })
            return _id

        } catch (error) {
            throw new Error(error.message)      
        }  
    }

    async actualizarPorId(id, obj,prop) {    
        try {

            const db = FirebaseAdmin.firestore()
            const query = db.collection(this.model)
            const doc = query.doc(id)            
            const data = {
              ...pick(obj, prop),
              fechaAuditoria: new Date()
            }
            
            await doc.update(data)
            
        } catch (error) {
            throw new Error(error.message)    
        }    
    }

    async eliminarPorId(id) {    
    try {
        const db = FirebaseAdmin.firestore()
        const query = db.collection(this.model)
        const doc = query.doc(id)
        await doc.delete()       
    } catch (error) {
        throw new Error(error.message)    
    }  
    }
}

export default ContenedorFireBaseDb