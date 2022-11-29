import { SET_FORM, SET_PRODUCTOS, SET_EDIT, FILTRAR_PRODUCTOS } from '../actions/actions-types'

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
        default:
            return state;
    }
}

export default rootReducer;