import {
    productosDao as productosApi    
  } from '../daos/index.js'
  

const log = '[ProductosController]'

class ProductosController {

  static async crear(data) {
    const method = '[crear]'
    try {
    
      console.log(`${log}${method} intentando crear producto.`)
      const result = await productosApi.crear(data)     
      console.log(`${log}${method} producto creado con éxito.`)
      return result
    } catch (error) {
        console.log(`${log}${method} ocurrio un error: ${error.message}`)
      throw error
    }
  }

  static async obtener() {
    const method = 'obtener'
    try {
      console.log(`${log}${method} intentando obtener productos.`)
      const productos = await productosApi.obtener()
      console.log(`${log}${method} productos encontrados con éxito.`)    
      return productos
    } catch (error) {
        console.log(`${log}${method} ocurrio un error: ${error.message}`)
      throw error
    }
  }

  static async obtenerPorId(idProducto) {
    const method = 'obtenerPorId'
    try {
        console.log(`${log}${method} intentando obtener producto ${idProducto}.`)
      const data = await productosApi.obtenerPorId(idProducto)
      console.log(data)
      console.log(`${log}${method} producto ${idProducto} encontrado con éxito.`)
      return data
    } catch (error) {
        console.log(`${log}${method} ocurrio un error: ${error.message}`)
      throw error
    }
  }

  static async actualizarPorId(idProducto, data, prop) {
    const method = 'actualizarPorId'
    try {
      console.log(`${log}${method} intentando actualizar producto: ${idProducto}.`)
      await productosApi.actualizarPorId(idProducto, data, prop)
      console.log(`${log} producto ${idProducto} actualizado con éxito.`)
    } catch (error) {
      console.log(`${log} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

  static async eliminarPorId(idProducto) {
    const method = 'borrarPorId'
    try {
      console.log(`${log}${method} intentando borrar producto: ${idProducto}.`)
     await productosApi.eliminarPorId(idProducto)
      console.log(`${log} producto ${idProducto} borrado con éxito.`)
    } catch (error) {
      console.error(`${log} Ah ocurrido un error: ${error.message}`)
      throw error
    }
  }

}

export default ProductosController