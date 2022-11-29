import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { filtrarProductos } from '../../actions';

function BuscarProducto({ productos, filtrarProductos }) {
    const [input, setInput] = useState('')

    const handleInputForFilter = function (e) {
        e.preventDefault();
        setInput(e.target.value)
    }

    useEffect(() => {
        // Your code here
        filtrarProductos(productos, input)
    }, [input]); //eslint-disable-line

    return (
        <div>
            <input type="search" value={input} onChange={handleInputForFilter} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productos: state.productos,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filtrarProductos: (lista, filtro) => dispatch(filtrarProductos(lista, filtro)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BuscarProducto);