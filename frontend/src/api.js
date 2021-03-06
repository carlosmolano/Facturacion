const request = require('superagent');

const prefix =
  process.env.NODE_ENV === 'integration' ? 'http://localhost:8192' : '';

const getFacturaURL = (codigo, empresa) => {
  return `${prefix}/venta/ver/${empresa}/${codigo}`;
};

const getFacturaExamenURL = (codigo, empresa) => {
  return `${prefix}/venta_ex/ver/${empresa}/${codigo}`;
};

module.exports = {
  insertarCliente: (
    ruc,
    nombre,
    direccion,
    email,
    telefono1,
    telefono2,
    descDefault
  ) => {
    return request
      .post(prefix + '/cliente/new')
      .send({
        ruc: ruc,
        nombre: nombre,
        direccion: direccion,
        email: email,
        telefono1: telefono1,
        telefono2: telefono2,
        descDefault: descDefault
      })
      .set('Accept', 'application/json');
  },

  updateCliente: (
    ruc,
    nombre,
    direccion,
    email,
    telefono1,
    telefono2,
    descDefault
  ) => {
    return request
      .post(prefix + '/cliente/update')
      .send({
        ruc: ruc,
        nombre: nombre,
        direccion: direccion,
        email: email,
        telefono1: telefono1,
        telefono2: telefono2,
        descDefault: descDefault
      })
      .set('Accept', 'application/json');
  },

  findClientes: queryString => {
    return request.get(prefix + '/cliente/find?q=' + queryString).send();
  },

  deleteCliente: ruc => {
    return request.post(prefix + `/cliente/delete/${ruc}`).send();
  },

  insertarMedico: (
    nombre,
    direccion,
    email,
    comision,
    telefono1,
    telefono2
  ) => {
    return request
      .post(prefix + '/medico/new')
      .send({
        nombre: nombre,
        direccion: direccion,
        email: email,
        comision,
        telefono1: telefono1,
        telefono2: telefono2
      })
      .set('Accept', 'application/json');
  },

  findMedicos: queryString => {
    return request.get(prefix + '/medico/find?q=' + queryString).send();
  },

  insertarProducto: (
    codigo,
    nombre,
    marca,
    precioDist,
    precioVenta,
    pagaIva
  ) => {
    return request
      .post(prefix + '/producto/new')
      .send({
        codigo: codigo,
        nombre: nombre,
        marca: marca,
        precioDist: precioDist,
        precioVenta: precioVenta,
        pagaIva: pagaIva
      })
      .set('Accept', 'application/json');
  },

  updateProducto: (
    rowid,
    codigo,
    nombre,
    marca,
    precioDist,
    precioVenta,
    pagaIva
  ) => {
    return request
      .post(prefix + '/producto/update')
      .send({
        rowid: rowid,
        codigo: codigo,
        nombre: nombre,
        marca: marca,
        precioDist: precioDist,
        precioVenta: precioVenta,
        pagaIva: pagaIva
      })
      .set('Accept', 'application/json');
  },

  findProductos: (queryString, limit) => {
    let url = prefix + `/producto/find?q=${queryString}`;
    if (limit) url += `&limit=${limit}`;
    return request.get(url).send();
  },

  deleteProducto: rowid => {
    return request.post(prefix + `/producto/delete/${rowid}`).send();
  },

  insertarVenta: ventaRow => {
    return request
      .post(prefix + '/venta/new')
      .send(ventaRow)
      .set('Accept', 'application/json');
  },

  insertarVentaExamen: ventaRow => {
    return request
      .post(prefix + '/venta_ex/new')
      .send(ventaRow)
      .set('Accept', 'application/json');
  },

  updateVenta: ventaRow => {
    return request
      .post(prefix + '/venta/update')
      .send(ventaRow)
      .set('Accept', 'application/json');
  },

  updateVentaExamen: ventaRow => {
    return request
      .post(prefix + '/venta_ex/update')
      .send(ventaRow)
      .set('Accept', 'application/json');
  },

  findVentas: queryString => {
    return request.get(prefix + '/venta/find?q=' + queryString).send();
  },

  findVentasExamen: queryString => {
    return request.get(prefix + '/venta_ex/find?q=' + queryString).send();
  },

  findAllVentas: queryString => {
    return request.get(prefix + '/venta/findAll?q=' + queryString).send();
  },

  verVenta: (codigo, empresa) => {
    return request
      .get(prefix + `/venta/ver/${empresa}/${codigo}`)
      .send()
      .set('Accept', 'application/json');
  },

  verVentaExamen: (codigo, empresa) => {
    return request
      .get(prefix + `/venta_ex/ver/${empresa}/${codigo}`)
      .send()
      .set('Accept', 'application/json');
  },

  deleteVenta: (codigo, empresa) => {
    return request
      .post(prefix + `/venta/delete/${empresa}/${codigo}`)
      .send()
      .set('Accept', 'application/json');
  },

  deleteVentaExamen: (codigo, empresa) => {
    return request
      .post(prefix + `/venta_ex/delete/${empresa}/${codigo}`)
      .send()
      .set('Accept', 'application/json');
  },

  getFacturaURL,
  getFacturaExamenURL,
  getFacturaURLByType: (codigo, empresa, tipo) => {
    if (tipo === 0) return getFacturaURL(codigo, empresa);
    if (tipo === 1) return getFacturaExamenURL(codigo, empresa);
    throw Error('tipo desconocido ' + tipo);
  }
};
