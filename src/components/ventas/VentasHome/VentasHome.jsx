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
import CortinaBlancaVentas from '../CortinaBlancaVentas/CortinaBlancaVentas'
import VentanaDescuentosVentas from '../VentanaDescuentosVentas/VentanaDescuentosVentas'
// importo ip de Home.jsx
import { ip } from '../../home/Home'

function VentasHome({ setProductos, productos }) {
    // creo el estado productosVentas
    const [productosVentas, setProductosVentas] = useState([]);
    // creo un estado para guardar los productos elegidos para vender
    const [productosElegidos, setProductosElegidos] = useState([]);

    const [cantidades, setCantidades] = useState({})

    // estados para el descuento
    const [descuento, setDescuento] = useState(100)
    const [fondoBlancoDescuento, setFondoBlancoDescuento] = useState(false)

    // para guardar los precios
    const [precios, setPrecios] = useState([])

    // creo un useEffect para que cuando inicie solo por primera vez se pidan los productos
    useEffect(() => {
        // Your code here
        setProductos();
    }, []); //eslint-disable-line

    return (
        <div className="pb-4 xl:pb-4">
            <HeaderVentas />
            <CortinaBlancaVentas gatillo={fondoBlancoDescuento} setGatillo={setFondoBlancoDescuento} />
            <VentanaDescuentosVentas visible={fondoBlancoDescuento} setVisible={setFondoBlancoDescuento} descuento={descuento} setDescuento={setDescuento} />
            <BuscadorVentas productosVentas={productosVentas} setProductosVentas={setProductosVentas} setProductosElegidos={setProductosElegidos} setCantidades={setCantidades} cantidades={cantidades} productosElegidos={productosElegidos} />
            <ProductosElegidosVentas setProductosElegidos={setProductosElegidos} productosElegidos={productosElegidos} cantidades={cantidades} setCantidades={setCantidades} precios={precios} setPrecios={setPrecios} />
            <hr />
            <TotalPrecioVentas lista={productosElegidos} setLista={setProductosElegidos} cantidades={cantidades} setCantidades={setCantidades} ip={ip} descuento={descuento} setDescuento={setDescuento} fondoBlancoDescuento={fondoBlancoDescuento} setFondoBlancoDescuento={setFondoBlancoDescuento} precios={precios} setPrecios={setPrecios} />
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
        // aplico setProductos
        setProductos: (input, array) => dispatch(setProductos(input, array))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VentasHome);