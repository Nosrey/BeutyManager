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
        <div>
            <label><strong>Buscar producto:  </strong></label>
            <input type="search" value={input1} onChange={handleInputForFilter} />
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