import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// importo connect
import { connect } from "react-redux";
// importo el componente BuscadorVentas
import BuscadorVentas from '../BuscadorVentas/BuscadorVentas';
import HeaderVentas from '../HeaderVentas/HeaderVentas';
import ProductosElegidosVentas from '../ProductosElegidosVentas/ProductosElegidosVentas';
// importo la action setProductos
import { setProductos } from '../../../actions/index'
import TotalPrecioVentas from '../TotalPrecioVentas/TotalPrecioVentas';
// importo ip de Home.jsx
import { ip } from '../../home/Home'

function VentasHome({ setProductos }) {
    // creo el estado productosVentas
    const [productosVentas, setProductosVentas] = useState([]);
    // creo un estado para guardar los productos elegidos para vender
    const [productosElegidos, setProductosElegidos] = useState([]);

    const [cantidades, setCantidades] = useState({})

    // creo un useEffect para que cuando inicie solo por primera vez se pidan los productos
    useEffect(() => {
        // Your code here
        setProductos();
    }, []); //eslint-disable-line

    return (
        <div className="">
            <HeaderVentas />
            <h1>Home</h1>
            <BuscadorVentas productosVentas={productosVentas} setProductosVentas={setProductosVentas} setProductosElegidos={setProductosElegidos} setCantidades={setCantidades} cantidades={cantidades} productosElegidos={productosElegidos} />
            <hr />
            <ProductosElegidosVentas setProductosElegidos={setProductosElegidos} productosElegidos={productosElegidos} cantidades={cantidades} setCantidades={setCantidades} />
            <TotalPrecioVentas lista={productosElegidos} setLista={setProductosElegidos} cantidades={cantidades} setCantidades={setCantidades} ip={ip} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        // aplico setProductos
        setProductos: (input, array) => dispatch(setProductos(input, array))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VentasHome);