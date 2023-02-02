import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js'

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor(){
        super('productos.txt')
    }
}

export default ProductosDaoArchivo