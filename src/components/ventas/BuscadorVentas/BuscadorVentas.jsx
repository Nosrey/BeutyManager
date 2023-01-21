// creo un componente vacio en jsx
// importo useState
import React, { useState } from 'react';
import { connect } from "react-redux";
// importo cajaVentas
import CajaVentas from '../CajaVentas/CajaVentas';

function BuscadorVentas({ productos, setProductosVentas, productosVentas, setCantidades, setProductosElegidos, cantidades, productosElegidos }) {
    // creo un estado para el input
    const [input, setInput] = useState('');

    // creo una funcion para manejar el input
    const handleInputChange = (e) => {

        let palabra = e.target.value

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


        let palabrasJuntas = separarPalabras(eliminarAcentos(palabra))
        palabrasJuntas = palabrasJuntas.filter((el) => el !== '')

        // declaramos resultados para guardar las coincidencias
        let resultados = []

        // un filtro que recibe un input y las separa por espacios en un array, luego revisa si cada una de esas palabras coincide con el nombre del producto o si tiene coincidencia con las categorias del producto, las coincidencias se guardan en un array y se retorna ese array
        if (palabrasJuntas.length && productos.length) {
            for (let i = 0; i < productos.length; i++) {
                let aprobado = 0; // para confirmar que cumple los valores del buscador
                for (let j = 0; j < palabrasJuntas.length; j++) {
                    // separo el string categoryNames del elemento de turno de productos en un array
                    let arrayDeTurno = productos[i].categoryNames.split(',')
                    for (let k = 0; k < arrayDeTurno.length; k++) {
                        if (arrayDeTurno[k].toLowerCase().includes(palabrasJuntas[j].toLowerCase()) && palabrasJuntas[j].length) { aprobado = aprobado + 1; }
                    }

                    if (productos[i].name.toLowerCase().includes(palabrasJuntas[j].toLowerCase()) && palabrasJuntas[j].length) { aprobado = aprobado + 1; }

                    if (productos[i].id.toString().toLowerCase().includes(palabrasJuntas[j].toLowerCase()) && palabrasJuntas[j].length) { aprobado = aprobado + 1; }
                }
                // pushear el elemento de la productos si la variable aprobado es mayor o igual a la longitud de palabrasJuntas
                if (aprobado >= palabrasJuntas.length) resultados.push(productos[i])
            }
        }



        if (resultados.length > 0) {
            // elimino de resultados todos los elementos cuyo stock sea de 0 o menor
            let productosFiltrados = resultados.filter((el) => el.stock > 0)
            setProductosVentas(productosFiltrados)
        } else {
            setProductosVentas([])
        }

        setInput(e.target.value);
    }

    return (
        <div className='focus:bg-red-500 '>
            <input type="search" value={input} onChange={handleInputChange} placeholder='Agregar Producto' className='border-2 border-black rounded' />
            <div className='relative'>
                <CajaVentas productosVentas={productosVentas} setProductosVentas={setProductosVentas} setProductosElegidos={setProductosElegidos} setCantidades={setCantidades} cantidades={cantidades} productosElegidos={productosElegidos} setInput={setInput} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productos: state.productos
    }
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BuscadorVentas);