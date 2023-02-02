import {
    carritosDao as carritosApi    
  } from '../daos/index.js'

const log = '[CarritosController]'

class CarritosController {

  static async crear(data) {
    const method = '[crear]'
    try {
    
      console.log(`${log}${method} intentando crear carrito.`)
      const result =  await carritosApi.crear(data)     
      console.log(`${log}${method} carrito creado con éxito.`)
      return result
    } catch (error) {
        console.log(`${log}${method} ocurrio un error: ${error.message}`)
      throw error
    }
  }

  static async eliminarPorId(idCarrito) {
    const method = 'borrarPorId'
    try {
      console.log(`${log}${method} intentando borrar carrito: ${idCarrito}.`)
      await carritosApi.eliminarPorId(idCarrito)
      console.log(`${log} carrito ${idCarrito} borrado con éxito.`)
    } catch (error) {
      console.error(`${log} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static async eliminarProductoCarrito(idCarrito,idProducto,prop) {
    const method = 'eliminarProductoCarrito'
    try {
      console.log(`${log}${method} intentando borrar producto del carrito: ${idCarrito}.`)
      await carritosApi.eliminarProductoCarrito(idCarrito,idProducto,prop)
      console.log(`${log} carrito ${idCarrito} borrado de producto del carrito con éxito.`)
    } catch (error) {
      console.error(`${log} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }
  

  static async obtenerProductosCarrito(idCarrito) {
    const method = 'obtenerProductosPorId'
    try {
        console.log(`${log}${method} intentando obtener productos del carrito ${idCarrito}.`)
      const data = await carritosApi.obtenerProductosCarrito(idCarrito)
      console.log(`${log}${method} carrito ${idCarrito} encontrado con éxito.`)
      return data
    } catch (error) {
        console.log(`${log}${method} ocurrio un error: ${error.message}`)
      throw error
    }
  }

  static async agregarProductoCarrito(idCarrito,data,prop) {
    const method = '[agregarProductoCarrito]'
    try {
    
      console.log(`${log}${method} intentando agregar producto al carrito.`)
      const result = await carritosApi.agregarProductoCarrito(idCarrito, data,prop)     
      console.log(`${log}${method} producto agregado al carrito con éxito.`)
      return result
    } catch (error) {
        console.log(`${log}${method} ocurrio un error: ${error.message}`)
      throw error
    }
  }

  static async obtenerPorId(idCarrito) {
    const method = 'obtenerPorId'
    try {
        console.log(`${log}${method} intentando obtener carrito ${idCarrito}.`)
      const data = await carritosApi.obtenerPorId(idCarrito)
      console.log(data);
      console.log(`${log}${method} carrito ${idCarrito} encontrado con éxito.`)
      return data
    } catch (error) {
        console.log(`${log}${method} ocurrio un error: ${error.message}`)
      throw error
    }
  }

  static async obtener() {
    const method = 'obtenerTodos'
    try {
        console.log(`${log}${method} intentando obtener carritos.`)
      const data = await carritosApi.obtener()
      console.log(`${log}${method} carritos encontrado con éxito.`)
      return data
    } catch (error) {
        console.log(`${log}${method} ocurrio un error: ${error.message}`)
      throw error
    }
  }

}


export default CarritosController