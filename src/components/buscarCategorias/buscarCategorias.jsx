import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { filtrarCategorias, filtrarProductos, setInput2 } from '../../actions';

function BuscarCategorias({ filtrarCategorias, productos, productosFiltrados, setInput2, input2, input1, filtrarProductos, }) {

    const handleInputForFilter = function (e) {
        e.preventDefault();
        setInput2(e.target.value)
    }

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

    useEffect(() => {
        // Your code here

        filtrarCategorias((productos), comas(input2).split(','), input1)
    }, [input2]); //eslint-disable-line

    return (
        <div className="m-2">
            <input type="search" value={input2} onChange={handleInputForFilter} className="font-medium mt-1 mr-0 inline w-64 px-3 py-0.5 bg-white border border-r-0 border-slate-400 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 rounded-r-none" />
            <label><strong className='m-0 text-lg bg-sky-500 text-white px-2 py-1 rounded-md border border-l-0 border-slate-400 rounded-l-none'>Buscar categorias</strong></label>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productos: state.productos,
        productosFiltrados: state.productosFiltrados,
        input2: state.input2,
        input1: state.input1,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filtrarCategorias: (lista, filtro, filtro2) => dispatch(filtrarCategorias(lista, filtro, filtro2)),
        filtrarProductos: (lista, filtro) => dispatch(filtrarProductos(lista, filtro)),
        setInput2: (text) => dispatch(setInput2(text)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BuscarCategorias);