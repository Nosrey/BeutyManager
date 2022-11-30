import { SET_FORM, SET_PRODUCTOS, SET_EDIT, FILTRAR_PRODUCTOS, ORDENAR_NOMBRE, ORDENAR_PRECIO, ORDENAR_STOCK } from '../actions/actions-types'

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
            console.log('entre a filtrar productos')
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
            let precioProductos = state.productos;
            let precioFiltros = state.productosFiltrados;

            if (action.payload) {
                precioProductos.sort(function (a, b) {
                    if (a.price < b.price) { return -1; }
                    if (a.price > b.price) { return 1; }
                    return 0;
                })
                precioFiltros.sort(function (a, b) {
                    if (a.price < b.price) { return -1; }
                    if (a.price > b.price) { return 1; }
                    return 0;
                })
            } else {
                precioProductos.sort(function (a, b) {
                    if (a.price > b.price) { return -1; }
                    if (a.price < b.price) { return 1; }
                    return 0;
                })
                precioFiltros.sort(function (a, b) {
                    if (a.price > b.price) { return -1; }
                    if (a.price < b.price) { return 1; }
                    return 0;
                })
            }
            return {
                ...state,
                productos: precioProductos,
                productosFiltrados: precioFiltros,
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


        default:
            return state;
    }
}

export default rootReducer;