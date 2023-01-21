import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// importo connect
import { connect } from "react-redux";
// importo el componente BuscadorVentas
import BuscadorVentas from '../BuscadorVentas/BuscadorVentas';
import CajaVentas from '../CajaVentas/CajaVentas';
import HeaderVentas from '../HeaderVentas/HeaderVentas';
// importo la action setProductos
import { setProductos } from '../../../actions/index'

function VentasHome({ productos, setProductos }) {
    // creo el estado productosVentas
    const [productosVentas, setProductosVentas] = useState([]);

    // creo un useEffect para que cuando inicie solo por primera vez se pidan los productos
    useEffect(() => {
        // Your code here
        setProductos();
    }, []); //eslint-disable-line

    return (
        <div className="">
            <HeaderVentas />
            <h1>Home</h1>
            <BuscadorVentas productosVentas={productosVentas} setProductosVentas={setProductosVentas} />
            <CajaVentas productosVentas={productosVentas} setProductosVentas={setProductosVentas} />
            <button onClick={() => console.log('soy productosVentas: ' + productosVentas)}>push me</button>
            <button onClick={() => console.log('soy soyProductos: ' + productos)}>push me soy productos</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        // aplico el estado productos
        productos: state.productos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // aplico setProductos
        setProductos: (input, array) => dispatch(setProductos(input, array))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VentasHome);