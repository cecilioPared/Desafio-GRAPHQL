import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js'

class CarritosDaoMem extends ContenedorMemoria {

    constructor(){
        super()
    }

    async guardar(carrito = { productos: [] }){
        return super.guardar(carrito)
    }

    async agregarProductoCarrito(idCarrito, producto,prop) {
        try {
          console.log(`intentando leer carrito con id ${idCarrito}`)
          let carrito = await super.obtenerPorId(idCarrito)   
          console.log('carrito encontrado: ', carrito)                                 
          carrito.productos.push(producto)                
          super.actualizarPorId(idCarrito,carrito,prop)
        } catch (error) {
          console.log("Ocurrio un error durante la operación:", error)
          throw new Error(error.message)
        }
      }

    async obtenerProductosCarrito(idCarrito){
        try {
          console.log(`intentando leer carrito con id ${idCarrito}`)
          let carrito = await super.obtenerPorId(idCarrito)   
          console.log('carrito encontrado: ', carrito)                                 
          
          if (carrito.productos.length === 0) {
            throw new Error(`Productos no encontrado en el carrito con id ${idCarrito}.`);
          }          
          return carrito.productos

        } catch (error) {
          console.log("Ocurrio un error durante la operación:", error)
          throw new Error(error.message)
        }
    }

    async eliminarProductoCarrito(idCarrito, idProducto,prop) {
        try {
          console.log(`intentando leer carrito con id ${idCarrito}`)
          let carrito = await super.obtenerPorId(idCarrito)   
          console.log('carrito encontrado: ', carrito)     
    
          const indexProducto = carrito.productos.findIndex((element) => {
            return String(element.id) === String(idProducto)
          })
    
          if (indexProducto === -1) {
            throw new Error(`Producto con id ${idProducto} no encontrado en el carrito con id ${idCarrito}.`)
          }
    
          carrito.productos.splice(indexProducto, 1)  

          super.actualizarPorId(idCarrito,carrito,prop)
        } catch (error) {
          console.log("Ocurrio un error durante la operación:", error)
          throw new Error(error.message)
        }
      }

}

export default CarritosDaoMem