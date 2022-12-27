import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { filtrarProductos, filtrarCategorias, setInput1 } from '../../actions';

function BuscarProducto({ productos, filtrarProductos, productosFiltrados, setInput1, input1, input2, filtrarCategorias }) {

    function comas(valorArray) {
        valorArray = valorArray.split('')
        for (let i = 0; i < valorArray.length; i++) {  // para quitar espacio post comas
            if (valorArray[i + 1] === ' ' && valorArray[i] === ',') {
                valorArray.splice(i + 1, 1)
                i = 0;
            }
        }
        return valorArray.join('')
    }

    const handleInputForFilter = function (e) {
        e.preventDefault();
        setInput1(e.target.value)
    }

    useEffect(() => {
        // Your code here

        filtrarProductos((productos), input1, comas(input2).split(','))

    }, [input1]); //eslint-disable-line

    return (
        <div className="text-xl mx-10 mb-4">
            <input type="search" placeholder='Buscar Producto' value={input1} onChange={handleInputForFilter} className="font-medium mt-1 mr-0 inline w-full xl:w-64 px-3 py-1 xl:py-1 xl:py-0.5 bg-white border xl:border-r-0 border-slate-400 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 xl:rounded-r-none py-1 text-xl xl:text-2xl"/>
            <label><strong className='m-0 text-lg bg-sky-500 text-white px-2 py-0.5 xl:py-0.5 rounded-md border border-l-0 border-slate-400 rounded-l-none text-md xl:text-2xl shadow-sm hidden xl:inline'>Buscar Producto</strong></label>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productos: state.productos,
        productosFiltrados: state.productosFiltrados,
        input1: state.input1,
        input2: state.input2,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filtrarProductos: (lista, filtro, filtro2) => dispatch(filtrarProductos(lista, filtro, filtro2)),
        filtrarCategorias: (lista, filtro) => dispatch(filtrarCategorias(lista, filtro)),
        setInput1: (text) => dispatch(setInput1(text)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BuscarProducto);