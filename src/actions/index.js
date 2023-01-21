import { SET_FORM, SET_PRODUCTOS, SET_EDIT, FILTRAR_PRODUCTOS, ORDENAR_NOMBRE, ORDENAR_PRECIO, ORDENAR_STOCK, SET_INPUT1, SET_INPUT2, ORDENAR_DEPOSITO, ORDENAR_TOTAL, ORDENAR_PRECIO_COMPRA, CAMBIAR_STOCK, ORDENAR_CODIGO, CAMBIAR_GATILLO_ELIMINAR, CAMBIAR_PAGINA, ACTIVAR_SUMAR } from "./actions-types";

// importo ip de Home.jsx
import { ip } from '../components/home/Home.jsx'

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

    console.log('soy el productoToEdit: ', producto)
    
    return function (dispatch) {
        return (
            dispatch({ type: SET_EDIT, payload: producto })
        )
    }
}

export function setProductos(input, orden = []) {
    if (!input) input = ''
    return function (dispatch) {
        // una funcion que revisa un array de productos y luego ordena un segudo array de productos que fue actualizado para que el nuevo tenga el mismo orden que el viejo
        function ordenarProductos(arrayViejo, arrayNuevo) {
            let arrayOrdenado = []
            for (let i = 0; i < arrayViejo.length; i++) {
                for (let j = 0; j < arrayNuevo.length; j++) {
                    if (arrayViejo[i].id === arrayNuevo[j].id) arrayOrdenado.push(arrayNuevo[j])
                }
            }
            return arrayOrdenado
        }
        return (
            fetch(ip + '/products')
                .then((res) => res.json())
                .then((json) => {
                    filtrarProductos(json, input)
                    if (orden.length > 0) {
                        let arrayOrdenado = ordenarProductos(orden, json)
                        dispatch({ type: SET_PRODUCTOS, payload: { array: arrayOrdenado, cambiar: false } })
                    }
                    else dispatch({ type: SET_PRODUCTOS, payload: { array: json, cambiar: true } })
                })
        )
    }
}

export function filtrarProductos(lista, filtro) {
    return function (dispatch) {
        // funcion para eliminar acentos de una palabra dada
        function eliminarAcentos(palabra) {
            let palabraSinAcentos = palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return palabraSinAcentos
        }

        // una funcion que separe palabras por espacio entre ellas y las guarde en un array
        function separarPalabras(texto) {
            let palabras = []
            let palabra = ''
            for (let i = 0; i < texto.length; i++) {
                if (texto[i] === ' ') {
                    palabras.push(palabra)
                    palabra = ''
                }
                else palabra = palabra + texto[i]
            }
            palabras.push(palabra)
            return palabras
        }


        let palabrasJuntas = separarPalabras(eliminarAcentos(filtro))
        palabrasJuntas = palabrasJuntas.filter((el) => el !== '')

        // declaramos resultados para guardar las coincidencias
        let resultados = []

        // un filtro que recibe un input y las separa por espacios en un array, luego revisa si cada una de esas palabras coincide con el nombre del producto o si tiene coincidencia con las categorias del producto, las coincidencias se guardan en un array y se retorna ese array
        if (palabrasJuntas.length && lista.length) {
            for (let i = 0; i < lista.length; i++) {
                let aprobado = 0; // para confirmar que cumple los valores del buscador
                for (let j = 0; j < palabrasJuntas.length; j++) {
                    // separo el string categoryNames del elemento de turno de lista en un array
                    let arrayDeTurno = lista[i].categoryNames.split(',')
                    for (let k = 0; k < arrayDeTurno.length; k++) {
                        if (arrayDeTurno[k].toLowerCase().includes(palabrasJuntas[j].toLowerCase()) && palabrasJuntas[j].length) { aprobado = aprobado + 1; }
                    }

                    if (lista[i].name.toLowerCase().includes(palabrasJuntas[j].toLowerCase()) && palabrasJuntas[j].length) { aprobado = aprobado + 1; }

                    if (lista[i].id.toString().toLowerCase().includes(palabrasJuntas[j].toLowerCase()) && palabrasJuntas[j].length) { aprobado = aprobado + 1; }
                }
                // pushear el elemento de la lista si la variable aprobado es mayor o igual a la longitud de palabrasJuntas
                if (aprobado >= palabrasJuntas.length) resultados.push(lista[i])
            }
        }

        if (!resultados.length) { resultados = []; dispatch({ type: FILTRAR_PRODUCTOS, payload: resultados }) }
        else dispatch({ type: FILTRAR_PRODUCTOS, payload: resultados })
    }
}

export function ordenarNombre(gatillo) {
    // console.log('entro ordenar nombre')
    return function (dispatch) {
        dispatch({ type: ORDENAR_NOMBRE, payload: gatillo })
    }
}

export function ordenarStock(gatillo) {
    // console.log('entro ordenar stock')
    return function (dispatch) {
        dispatch({ type: ORDENAR_STOCK, payload: gatillo })
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

// una action que ordena dos listas de mayor a menor y recibe una variable booleana, si la variable esta en false entonces ordena ambas listas de menor a mayor
export function ordenarDeposito(lista, lista2, gatillo) {
    return function (dispatch) {
        if (gatillo) {
            lista.sort((a, b) => (a.stockDeposito > b.stockDeposito) ? 1 : -1)
            lista2.sort((a, b) => (a.stockDeposito > b.stockDeposito) ? 1 : -1)
        }
        else {
            lista.sort((a, b) => (a.stockDeposito < b.stockDeposito) ? 1 : -1)
            lista2.sort((a, b) => (a.stockDeposito < b.stockDeposito) ? 1 : -1)
        }
        let listas = { listaOrdenada: lista, listaOrdenada2: lista2 }
        console.log('hola soy el activo: ', gatillo)
        dispatch({ type: ORDENAR_DEPOSITO, payload: listas })
    }
}

// una action que ordena dos listas de mayor a menor en base a la suma del stock y del stockDeposito de cada producto, tambien recibe una variable booleana y si la variable esta en false entonces ordena ambas listas de menor a mayor
export function ordenarTotal(lista, lista2, gatillo) {
    return function (dispatch) {
        if (gatillo) {
            lista.sort((a, b) => (a.stock + a.stockDeposito > b.stock + b.stockDeposito) ? 1 : -1)
            lista2.sort((a, b) => (a.stock + a.stockDeposito > b.stock + b.stockDeposito) ? 1 : -1)
        }
        else {
            lista.sort((a, b) => (a.stock + a.stockDeposito < b.stock + b.stockDeposito) ? 1 : -1)
            lista2.sort((a, b) => (a.stock + a.stockDeposito < b.stock + b.stockDeposito) ? 1 : -1)
        }
        let listas = { listaOrdenada: lista, listaOrdenada2: lista2 }
        dispatch({ type: ORDENAR_TOTAL, payload: listas })
    }
}

// una action que ordena dos listas de mayor a menor en base al precio de cada producto, tambien recibe una variable booleana y si la variable esta en false entonces ordena ambas listas de menor a mayor
export function ordenarPrecio(lista, lista2, gatillo) {
    return function (dispatch) {
        if (gatillo) {
            lista.sort((a, b) => (a.price > b.price) ? 1 : -1)
            lista2.sort((a, b) => (a.price > b.price) ? 1 : -1)
        }
        else {
            lista.sort((a, b) => (a.price < b.price) ? 1 : -1)
            lista2.sort((a, b) => (a.price < b.price) ? 1 : -1)
        }
        let listas = { listaOrdenada: lista, listaOrdenada2: lista2 }
        dispatch({ type: ORDENAR_PRECIO, payload: listas })
    }
}

// una action que ordena dos listas de mayor a menor en base al precio de compra de cada producto, tambien recibe una variable booleana y si la variable esta en false entonces ordena ambas listas de menor a mayor
export function ordenarPrecioCompra(lista, lista2, gatillo) {
    return function (dispatch) {
        if (gatillo) {
            lista.sort((a, b) => (a.priceBuy > b.priceBuy) ? 1 : -1)
            lista2.sort((a, b) => (a.priceBuy > b.priceBuy) ? 1 : -1)
        }
        else {
            lista.sort((a, b) => (a.priceBuy < b.priceBuy) ? 1 : -1)
            lista2.sort((a, b) => (a.priceBuy < b.priceBuy) ? 1 : -1)
        }
        let listas = { listaOrdenada: lista, listaOrdenada2: lista2 }
        dispatch({ type: ORDENAR_PRECIO_COMPRA, payload: listas })
    }
}

// action para establecer el producto que se esta editando
export function cambiarStock(id, lista) {
    return function (dispatch) {
        let producto = lista.find(producto => producto.id === id)
        dispatch({ type: CAMBIAR_STOCK, payload: producto })
    }
}

// action para ordenar dos listas de productos de mayor a menor en base a el id del producto y si ya esta ordenado de mayor a menor entonces lo ordena de menor a mayor en base a un booleando que recibe
export function ordenarCodigo(lista, lista2, gatillo) {
    return function (dispatch) {
        if (gatillo) {
            lista.sort((a, b) => (a.id > b.id) ? 1 : -1)
            lista2.sort((a, b) => (a.id > b.id) ? 1 : -1)
        }
        else {
            lista.sort((a, b) => (a.id < b.id) ? 1 : -1)
            lista2.sort((a, b) => (a.id < b.id) ? 1 : -1)
        }
        let listas = { listaOrdenada: lista, listaOrdenada2: lista2 }
        dispatch({ type: ORDENAR_CODIGO, payload: listas })
    }
}

// action para cambiar el booleano de gatilloEliminar que esta en el estado del reducer
export function cambiarGatilloEliminar() {
    return function (dispatch) {
        dispatch({ type: CAMBIAR_GATILLO_ELIMINAR })
    }
}

// funcion que cambia de pagina en el componente de paginacion que muestra productos de 10 en 10
export function cambiarPagina(pagina) {
    return function (dispatch) {
        dispatch({ type: CAMBIAR_PAGINA, payload: pagina })
    }
}

// creamos una action llamada activarSumar que cambiara el booleano de sumar en el estado del reducer
export function activarSumar() {
    return function (dispatch) {
        dispatch({ type: ACTIVAR_SUMAR })
    }
}