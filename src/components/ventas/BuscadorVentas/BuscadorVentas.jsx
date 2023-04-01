// creo un componente vacio en jsx
// importo useState
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
// importo cajaVentas
import CajaVentas from '../CajaVentas/CajaVentas';

function BuscadorVentas({ productos, setProductosVentas, productosVentas, setCantidades, setProductosElegidos, cantidades, productosElegidos, precios, setPrecios }) {
    // creo un estado para el input
    const [input, setInput] = useState('');
    const [activarInput, setActivarInput] = useState(true);

    // un useEffect donde cuando productos se actualice revisa si este tiene 1 elemento o mas, si es asi entonces se cambia activarInput a true
    useEffect(() => {
        if (productos.length > 0) {
            setActivarInput(false)
        } else {
            setActivarInput(true)
        }
    }, [productos])

    let clasesBuscador = "font-medium w-[100%] px-3 py-2 xl:py-3 xl:py-0.5 bg-white rounded-lg text-lg shadow-sm text-black placeholder-slate-400 focus:outline-none focus:border-sky-600  focus:ring-sky-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  py-1 xl:py-0.5 text-xl xl:text-2xl italic bg-white-800 placeholder:text-black placeholder:font-bold border border-stone-300 shadow-md xl:px-8"

    let clasesBuscadorEdited = "font-medium w-[100%] px-3 py-2 xl:py-3 xl:py-0.5 bg-white rounded-lg text-lg shadow-sm text-black placeholder-slate-400 focus:outline-none focus:border-slate-200  focus:ring-sky-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500  py-1 xl:py-0.5 text-xl xl:text-2xl italic bg-white-800 placeholder:text-black placeholder:font-bold border-slate-200 border border rounded-b-none border-b-0 xl:px-8"

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
        <div className='focus:bg-red-500 flex flex-col items-center justify-center w-[90%] xl:w-[80%] mx-auto my-4 mb-8 xl:mt-6'>
            <input type="search" value={input} onChange={handleInputChange} placeholder='Añadir productos...' className={productosVentas.length ? clasesBuscadorEdited + ' py-4' : clasesBuscador + ' py-4'} disabled={activarInput}/>
            <div className='relative w-[100%]'>
                <CajaVentas precios={precios} setPrecios={setPrecios} productosVentas={productosVentas} setProductosVentas={setProductosVentas} setProductosElegidos={setProductosElegidos} setCantidades={setCantidades} cantidades={cantidades} productosElegidos={productosElegidos} setInput={setInput} />
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