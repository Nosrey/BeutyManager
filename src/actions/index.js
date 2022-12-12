import { SET_FORM, SET_PRODUCTOS, SET_EDIT, FILTRAR_PRODUCTOS, ORDENAR_NOMBRE, ORDENAR_PRECIO, ORDENAR_STOCK, SET_CATEGORIAS, SET_INPUT1, SET_INPUT2 } from "./actions-types";

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
        if (productoLista[i].id === id) producto = productoLista[i]
    }
    console.log('soy el producto: ', producto)
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

export function filtrarProductos(lista, filtro, filtro2) {
    // console.log('entro filtrar productos')
    return function (dispatch) {
        let resultados = []
        if (filtro2.length && lista.length) {
            for (let i = 0; i < lista.length; i++) {
                let aprobado = 0; // para confirmar que cumple los valores del buscador
                for (let j = 0; j < filtro2.length; j++) {
                    for (let k = 0; k < lista[i].Categories.length; k++) {
                        if (lista[i].Categories[k].name.toLowerCase() === filtro2[j].toLowerCase() && filtro2[j].length) { aprobado = aprobado + 1; break; }
                    }
                    if (aprobado === filtro2.length) resultados.push(lista[i])
                }
            }
            let resultados2 = resultados.filter((el) => el.name.toLowerCase().includes(filtro.toLowerCase()) )
            if (resultados2.length) resultados = resultados2
        }

        if (!resultados.length) {
            let resultados2 = lista.filter((el) => (el.name.toLowerCase().includes(filtro.toLowerCase()) && filtro.length))
            if (resultados2.length) resultados = resultados2
        }

        if (!resultados.length && !filtro2.length) { resultados = []; dispatch({ type: FILTRAR_PRODUCTOS, payload: [] }) }
        else dispatch({ type: FILTRAR_PRODUCTOS, payload: resultados })
    }
}

export function ordenarNombre(gatillo) {
    // console.log('entro ordenar nombre')
    return function (dispatch) {
        dispatch({ type: ORDENAR_NOMBRE, payload: gatillo })
    }
}


export function ordenarPrecio(gatillo) {
    // console.log('entro ordenar precio')
    return function (dispatch) {
        dispatch({ type: ORDENAR_PRECIO, payload: gatillo })
    }
}


export function ordenarStock(gatillo) {
    // console.log('entro ordenar stock')
    return function (dispatch) {
        dispatch({ type: ORDENAR_STOCK, payload: gatillo })
    }
}

export function setCategorias() {
    return function (dispatch) {
        return (
            fetch('http://localhost:3001/categories')
                .then((res) => res.json())
                .then((json) => {
                    dispatch({ type: SET_CATEGORIAS, payload: json })
                })
        )
    }
}

export function filtrarCategorias(lista, filtro, filtro2) {
    return function (dispatch) {
        let resultados = []
        let lista2 = []
        if (filtro2.length) {
            lista2 = lista.filter((el) => el.name.toLowerCase().includes(filtro2.toLowerCase()))
            lista = lista2
        }

        for (let i = 0; i < lista.length; i++) {
            let aprobado = 0; // para confirmar que cumple los valores del buscador
            for (let j = 0; j < filtro.length; j++) {
                for (let k = 0; k < lista[i].Categories.length; k++) {
                    if (lista[i].Categories[k].name.toLowerCase() === filtro[j].toLowerCase() && filtro[j].length) { aprobado = aprobado + 1; break; }
                }
                if (aprobado === filtro.length) resultados.push(lista[i])
            }
        }
        if (!resultados.length && lista2.length) resultados = lista2
        if (!resultados.length && !filtro2.length) dispatch({ type: FILTRAR_PRODUCTOS, payload: [] })
        else { dispatch({ type: FILTRAR_PRODUCTOS, payload: resultados }) }
    }
}

export function setInput1(text) {
    return function (dispatch) {
        dispatch({ type: SET_INPUT1, payload: text })
    }
}

export function setInput2(text) {
    return function (dispatch) {
        dispatch({ type: SET_INPUT2, payload: text })
    }
}