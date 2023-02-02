let productosDao
let carritosDao
let usuariosDao

switch (process.env.PERSISTENCIA) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = await import('./carritos/CarritosDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break    
    case 'mongodb':        
        const { default: ProductosDaoMongoDb } = await import('./productos/ProductosDaoMongoDb.js')
        const { default: CarritosDaoMongoDb } = await import('./carritos/CarritosDaoMongoDb.js')
        const { default: UsuariosDaoMongoDb } = await import('./usuarios/UsuariosDaoMongoDb.js')

        productosDao = new ProductosDaoMongoDb()
        carritosDao = new CarritosDaoMongoDb()
        usuariosDao = new UsuariosDaoMongoDb()
        break
        case 'firebasedb':        
        const { default: ProductosDaoFireBaseDb } = await import('./productos/ProductosDaoFireBaseDb.js')
        const { default: CarritosDaoFireBaseDb } = await import('./carritos/CarritosDaoFireBase.js')

        productosDao = new ProductosDaoFireBaseDb()
        carritosDao = new CarritosDaoFireBaseDb()
        break
        
    default:
        const { default: ProductosDaoMem } = await import('./productos/ProductosDaoMem.js')
        const { default: CarritosDaoMem } = await import('./carritos/CarritosDaoMem.js')

        productosDao = new ProductosDaoMem()
        carritosDao = new CarritosDaoMem()
}

export { productosDao, carritosDao, usuariosDao }