import React, { useEffect } from 'react';
import Product from '../product/product.jsx'
import CrearProducto from '../crearProducto/crearProducto.jsx';
import { setForm, setProductos, ordenarNombre, ordenarPrecio, ordenarStock } from '../../actions/index'
import { connect } from "react-redux";
import CambiarProducto from '../cambiarProducto/cambiarProducto.jsx';
import BuscarProducto from '../buscarProducto/buscarProducto.jsx';
import './Home.css'

let gatilloNombre = true;
let gatilloPrecio = true;
let gatilloStock = true;

function Home({ mostrarForm, setForm, setProductos, productos, mostrarEdit, productosFiltrados, ordenarNombre, ordenarPrecio, ordenarStock, activo }) {

    const ordenNombre = function () {
        ordenarNombre(gatilloNombre)
        gatilloNombre = !gatilloNombre
    }

    const ordenPrecio = function () {
        ordenarPrecio(gatilloPrecio)
        gatilloPrecio = !gatilloPrecio
    }

    const ordenStock = function () {
        ordenarStock(gatilloStock)
        gatilloStock = !gatilloStock
    }

    useEffect(() => {
        // Your code here
        setProductos()
    }, []); //eslint-disable-line

    return (
        <div>
            <BuscarProducto />
            <button onClick={ordenNombre}>Ordenar A - Z</button>
            <button onClick={ordenPrecio}>Ordenar por precio</button>
            <button onClick={ordenStock}>Ordenar por Stock</button>

            <CrearProducto visible={mostrarForm} />
            <CambiarProducto visible={mostrarEdit} />
            <h1>Home screen</h1>
            <button onClick={setForm}>Crear producto</button>
            <p>{productosFiltrados.length}</p>
            <div>
                {!productos.length ? <h1>No hay productos disponibles</h1> : (productosFiltrados.length ? productosFiltrados : productos).map(el => {
                    return <Product key={el.id} id={el.id} name={el.name} imagen={el.imagen} stock={el.stock} price={el.price} avaible={el.avaible} />
                })}
                {productosFiltrados.length ? <p>entre con pf</p> : <p>entre con p</p>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        mostrarForm: state.mostrarForm,
        mostrarEdit: state.mostrarEdit,
        productos: state.productos,
        productosFiltrados: state.productosFiltrados,
        activo: state.activo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setForm: () => dispatch(setForm()),
        setProductos: () => dispatch(setProductos()),
        ordenarNombre: (gatillo) => dispatch(ordenarNombre(gatillo)),
        ordenarPrecio: (gatillo) => dispatch(ordenarPrecio(gatillo)),
        ordenarStock: (gatillo) => dispatch(ordenarStock(gatillo)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);