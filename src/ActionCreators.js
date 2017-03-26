import {
  NUEVO_CLIENTE_DIALOG,
  NUEVO_PRODUCTO_DIALOG,
  NUEVO_MEDICO_DIALOG,
  NUEVO_CLIENTE_DIALOG_CLOSED,
  NUEVO_PRODUCTO_DIALOG_CLOSED,
  NUEVO_MEDICO_DIALOG_CLOSED } from './DialogTypes'
import {
  NEW_FACTURA_PAGE,
  FACTURA_LIST_PAGE,
  PRODUCTO_LIST_PAGE,
  EDITAR_FACTURA_PAGE,
  NEW_FACTURA_EXAMEN_PAGE,
  EDITAR_FACTURA_EXAMEN_PAGE } from './PageTypes'
import {
  CAMBIAR_DIALOG_ACTION,
  CAMBIAR_PAGE_ACTION,
  CERRAR_DIALOG_CON_MSG_ACTION,
  ABRIR_LINK_CON_SNACKBAR } from './ActionTypes'

const cambiarPagina = (tipoPagina, props) => {
  switch (tipoPagina) {
    case FACTURA_LIST_PAGE:
      return {
        type: CAMBIAR_PAGE_ACTION,
        value: FACTURA_LIST_PAGE,
        props: props,
      }
    case PRODUCTO_LIST_PAGE:
      return {
        type: CAMBIAR_PAGE_ACTION,
        value: PRODUCTO_LIST_PAGE,
        props: props,
      }
    case NEW_FACTURA_PAGE:
      return {
        type: CAMBIAR_PAGE_ACTION,
        value: NEW_FACTURA_PAGE,
        props: props,
      }
    case EDITAR_FACTURA_PAGE:
      return {
        type: CAMBIAR_PAGE_ACTION,
        value: EDITAR_FACTURA_PAGE,
        props: props,
      }
    case NEW_FACTURA_EXAMEN_PAGE:
      return {
        type: CAMBIAR_PAGE_ACTION,
        value: NEW_FACTURA_EXAMEN_PAGE,
        props: props,
      }
    case EDITAR_FACTURA_EXAMEN_PAGE:
      return {
        type: CAMBIAR_PAGE_ACTION,
        value: EDITAR_FACTURA_EXAMEN_PAGE,
        props: props,
      }
    default:
      throw new Error("Tipo de pagina desconocida: " + tipoPagina)
  }
}

module.exports = {
  cambiarDialog(tipoDialog) {
    switch (tipoDialog) {
      case NUEVO_CLIENTE_DIALOG:
        return {
          type: CAMBIAR_DIALOG_ACTION,
          value: NUEVO_CLIENTE_DIALOG,
        }
      case NUEVO_MEDICO_DIALOG:
        return {
          type: CAMBIAR_DIALOG_ACTION,
          value: NUEVO_MEDICO_DIALOG,
        }
      case NUEVO_PRODUCTO_DIALOG:
        return {
          type: CAMBIAR_DIALOG_ACTION, value: NUEVO_PRODUCTO_DIALOG,
        }
      case NUEVO_CLIENTE_DIALOG_CLOSED:
        return {
          type: CAMBIAR_DIALOG_ACTION,
          value: NUEVO_CLIENTE_DIALOG_CLOSED,
        }
      case NUEVO_MEDICO_DIALOG_CLOSED:
        return {
          type: CAMBIAR_DIALOG_ACTION,
          value: NUEVO_MEDICO_DIALOG_CLOSED,
        }
      case NUEVO_PRODUCTO_DIALOG_CLOSED:
        return {
          type: CAMBIAR_DIALOG_ACTION,
          value: NUEVO_PRODUCTO_DIALOG_CLOSED,
        }
      default:
        throw new Error("Tipo de dialog desconocido: " + tipoDialog)
    }
  },

  editarFactura(codigo, empresa) {
    return cambiarPagina(EDITAR_FACTURA_PAGE, {
      ventaKey: {
        codigo: codigo,
        empresa: empresa,
      },
    })
  },

  editarFacturaExamen(codigo, empresa) {
    return cambiarPagina(EDITAR_FACTURA_EXAMEN_PAGE, {
      ventaKey: {
        codigo: codigo,
        empresa: empresa,
      },
    })
  },

  cambiarPagina: cambiarPagina,

  cerrarDialogConMsg(msg, dialogType) {
    if(dialogType !== NUEVO_PRODUCTO_DIALOG_CLOSED
      && dialogType !== NUEVO_CLIENTE_DIALOG_CLOSED && dialogType !== NUEVO_MEDICO_DIALOG_CLOSED)
      throw Error('Para cerrar el dialog es necesario un tipo que termine en _CLOSED')
    return {
      type: CERRAR_DIALOG_CON_MSG_ACTION,
      dialog: dialogType,
      message: msg,
    }
  },

  abrirLinkConSnackbar(msg, link) {
    return {
      type: ABRIR_LINK_CON_SNACKBAR,
      message: msg,
      link: link,
    }
  },
}
