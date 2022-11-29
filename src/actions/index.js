import { SET_FORM, SET_PRODUCTOS, SET_EDIT, FILTRAR_PRODUCTOS } from "./actions-types";

export function setForm() {
    return function (dispatch) {
        return (
            dispatch({ type: SET_FORM })
        )
    }
}

export function setEdit(id, productoLista) {
    let producto = {}
    for (let i = 0; i < productoLista.length; i++) {
        if (productoLista[i].id === id)  producto = productoLista[i]
    }
    return function (dispatch) {
        return (
            dispatch({ type: SET_EDIT, payload: producto })
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

export function filtrarProductos(lista, filtro) {
    return function(dispatch) {
        let resultados = lista.filter((el) => el.name.toLowerCase().includes(filtro.toLowerCase()))
        if (filtro === '' || filtro === ' ' || filtro === '  ') resultados = []
        dispatch({ type: FILTRAR_PRODUCTOS, payload: resultados })
    }
}