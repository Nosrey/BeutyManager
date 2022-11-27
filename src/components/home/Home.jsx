import React, { useEffect } from 'react';
import Product from '../product/product.jsx'
import CrearProducto from '../crearProducto/crearProducto.jsx';
import { setForm, setProductos } from '../../actions/index'
import { connect } from "react-redux";

function Home({ mostrarForm, setForm, setProductos, productos }) {

    useEffect(() => {
        // Your code here
        setProductos()
    }, []); //eslint-disable-line

    return (
        <div>
            <CrearProducto visible={mostrarForm} />
            <h1>Home screen</h1>
            <button onClick={setForm}>Crear producto</button>
            <div>
                {!productos.length ? <h1>No hay productos disponibles</h1> : productos.map(el => {
                    return <Product key={el.id} id={el.id} name={el.name} imagen={el.imagen} stock={el.stock} price={el.price} avaible={el.avaible} />
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        mostrarForm: state.mostrarForm,
        productos: state.productos,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setForm: () => dispatch(setForm()),
        setProductos: () => dispatch(setProductos()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);