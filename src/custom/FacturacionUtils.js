const { oneYearFromToday, toReadableDate } = require('../DateParser.js')
const iva = 0.14

const calcularSubtotal = (productos) => {
  let subtotal = 0
  const len = productos.size
  for (let i = 0; i < len; i++) {
    const product = productos.get(i)
    subtotal += product.get('precioVenta') * product.get('count')
  }
  return subtotal
}

const calcularIVA = (subtotal) => {
  return subtotal * iva
}

const calcularValores = (productos, descuento) => {
  const subtotal = calcularSubtotal(productos)
  const rebaja = subtotal * descuento / 100
  const valorIVA = calcularIVA(subtotal)
  const total = subtotal - rebaja + valorIVA

  return Object.freeze({
    subtotal: subtotal,
    rebaja: rebaja,
    valorIVA: valorIVA,
    total: total,
  })
}

const crearProductosVendidosRows = (productos) => {
  const len = productos.size
  const unidades = []
  for (let i = 0; i < len; i++) {
    const producto = productos.get(i)
    unidades.push({
      producto: producto.get('producto'),
      lote: producto.get('lote'),
      fechaExp: toReadableDate(producto.get('fechaExp')),
      count: producto.get('count'),
      precioVenta: producto.get('precioVenta'),
    })
  }
  return unidades
}

const crearUnidadesRows = (productos) => {
  const len = productos.size
  const unidades = []
  for (let i = 0; i < len; i++) {
    const producto = productos.get(i)
    const count = producto.get('count')
    for (let j = 0; j < count; j++)
      unidades.push({
        producto: producto.get('rowid'),
        lote: producto.get('lote'),
        fechaExp: producto.get('fechaExp'),
      })
  }
  return unidades
}


module.exports = {
  crearUnidadesRows: crearUnidadesRows,

  productoAUnidad: (producto) => {
    const unidad = Object.assign({}, producto)
    unidad.producto = producto.rowid
    delete unidad.rowid
    delete unidad.codigo
    delete unidad.precioDist
    delete unidad.nombre
    unidad.lote = ''
    unidad.count = 1
    unidad.fechaExp = oneYearFromToday()
    return unidad
  },

  crearVentaRow: (clienteObj, facturaData, productos) => {

    const desc = facturaData.get('descuento')
    const {
      subtotal,
      rebaja,
      valorIVA,
      total,
    } = calcularValores(productos, desc)

    return {
      cliente: clienteObj.ruc,
      codigo: facturaData.get('codigo'),
      descuento: rebaja,
      autorizacion: facturaData.get('autorizacion'),
      formaPago: facturaData.get('formaPago'),
      fecha: toReadableDate(facturaData.get('fecha')),
      iva: valorIVA,
      subtotal: subtotal,
      total: total,
      productos: crearProductosVendidosRows(productos),
    }
  },

  calcularValores: calcularValores,


}
