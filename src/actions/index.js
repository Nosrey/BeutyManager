import { SET_FORM, SET_PRODUCTOS } from "./actions-types";

export function setForm() {
    return function (dispatch) {
        return (
            dispatch({ type: SET_FORM })
        )
    }
}

export function setProductos() {
    return function (dispatch) {
        return (
            fetch('http://localhost:3001/products')
                .then((res) => res.json())
                .then((json) => {
                    dispatch({ type: SET_PRODUCTOS, payload: json })
                })
        )
    }
}

