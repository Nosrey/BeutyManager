import { SET_FORM, SET_PRODUCTOS, SET_EDIT, FILTRAR_PRODUCTOS, ORDENAR_NOMBRE, ORDENAR_PRECIO, ORDENAR_STOCK, SET_INPUT1, SET_INPUT2, ORDENAR_DEPOSITO, ORDENAR_TOTAL, ORDENAR_PRECIO_COMPRA, CAMBIAR_STOCK, ORDENAR_CODIGO, CAMBIAR_GATILLO_ELIMINAR, CAMBIAR_PAGINA, ACTIVAR_SUMAR } from '../actions/actions-types'

const initialState = {
    dataUser: [
        {
            username: "heber",
            password: "heber"
        }
    ],
    mostrarForm: false,
    mostrarEdit: false,
    productoToEdit: {},
    productos: [],
    productosFiltrados: [],
    activo: true,
    input1: '',
    input2: '',
    gatilloEliminar : false,
    pagina: 1,
    sumar: false,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FORM:
            return {
                ...state,
                mostrarForm: !state.mostrarForm
            }
        case SET_EDIT:
            return {
                ...state,
                mostrarEdit: !state.mostrarEdit,
                productoToEdit: action.payload
            }
        case SET_PRODUCTOS:
            return {
                ...state,
                productos: action.payload
            }
        case FILTRAR_PRODUCTOS:
            return {
                ...state,
                productosFiltrados: action.payload
            }
        case ORDENAR_NOMBRE:
            let nombreProductos = state.productos;
            let nombreFiltros = state.productosFiltrados;

            if (action.payload) {
                nombreProductos.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                    return 0;
                })
                nombreFiltros.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                    return 0;
                })
            } else {
                nombreProductos.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) { return -1; }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) { return 1; }
                    return 0;
                })
                nombreFiltros.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) { return -1; }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) { return 1; }
                    return 0;
                })
            }
            return {
                ...state,
                productosFiltrados: nombreFiltros,
                productos: nombreProductos,
                activo: !state.activo
            }

        case ORDENAR_PRECIO:
            return {
                ...state,
                productos: action.payload.listaOrdenada,
                productosFiltrados: action.payload.listaOrdenada2,
                activo: !state.activo
            }

        case ORDENAR_STOCK:
            let stockProductos = state.productos;
            let stockFiltros = state.productosFiltrados;

            if (action.payload) {
                stockProductos.sort(function (a, b) {
                    if (a.stock < b.stock) { return -1; }
                    if (a.stock > b.stock) { return 1; }
                    return 0;
                })
                stockFiltros.sort(function (a, b) {
                    if (a.stock < b.stock) { return -1; }
                    if (a.stock > b.stock) { return 1; }
                    return 0;
                })
            } else {
                stockProductos.sort(function (a, b) {
                    if (a.stock > b.stock) { return -1; }
                    if (a.stock < b.stock) { return 1; }
                    return 0;
                })
                stockFiltros.sort(function (a, b) {
                    if (a.stock > b.stock) { return -1; }
                    if (a.stock < b.stock) { return 1; }
                    return 0;
                })
            }
            return {
                ...state,
                productos: stockProductos,
                productosFiltrados: stockFiltros,
                activo: !state.activo
            }
        case SET_INPUT1:
            return {
                ...state,
                input1: action.payload
            }

        case SET_INPUT2:
            return {
                ...state,
                input2: action.payload
            }

        case ORDENAR_DEPOSITO:
            return {
                ...state,
                productos: action.payload.listaOrdenada,
                productosFiltrados: action.payload.listaOrdenada2,
                activo: !state.activo,
            }
        case ORDENAR_TOTAL:
            return {
                ...state,
                productos: action.payload.listaOrdenada,
                productosFiltrados: action.payload.listaOrdenada2,
                activo: !state.activo,
            }
        case ORDENAR_PRECIO_COMPRA:
            return {
                ...state,
                productos: action.payload.listaOrdenada,
                productosFiltrados: action.payload.listaOrdenada2,
                activo: !state.activo,
            }
        // implemento CAMBIAR_STOCK en el reducer
        case CAMBIAR_STOCK:
            return {
                ...state,
                productoToEdit: action.payload
            }
        case ORDENAR_CODIGO:
            return {
                ...state,
                productos: action.payload.listaOrdenada,
                productosFiltrados: action.payload.listaOrdenada2,
                activo: !state.activo,                
            }
        case CAMBIAR_GATILLO_ELIMINAR:
            return {
                ...state,
                gatilloEliminar: !state.gatilloEliminar
            }
        case CAMBIAR_PAGINA:
            return {
                ...state,
                pagina: action.payload
            }
        case ACTIVAR_SUMAR:
            return {
                ...state,
                sumar: !state.sumar
            }
        default:
            return state;
    }
}

export default rootReducer;