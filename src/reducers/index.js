import { SET_FORM, SET_PRODUCTOS, SET_EDIT } from '../actions/actions-types'

const initialState = {
    dataUser: [
        {
            username: "heber",
            password: "heber"
        }
    ],
    mostrarForm: false,
    mostrarEdit: false,
    productos: [],
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
                mostrarEdit: !state.mostrarEdit
            }
        case SET_PRODUCTOS:
            return {
                ...state,
                productos: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;