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
        <div>
            <label><strong>Buscar categorias:  </strong></label>
            <input type="search" value={input2} onChange={handleInputForFilter} />
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