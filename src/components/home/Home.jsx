import React, { useEffect } from 'react';
import Product from '../product/product.jsx'
import CrearProducto from '../crearProducto/crearProducto.jsx';
import { setForm, setProductos, ordenarNombre, ordenarPrecio, ordenarStock, setCategorias } from '../../actions/index'
import { connect } from "react-redux";
import CambiarProducto from '../cambiarProducto/cambiarProducto.jsx';
import BuscarProducto from '../buscarProducto/buscarProducto.jsx';
import BuscarCategorias from '../buscarCategorias/buscarCategorias.jsx';
import './Home.css'

let gatilloNombre = true;
let gatilloPrecio = true;
let gatilloStock = true;

function Home({ mostrarForm, setForm, setProductos, productos, mostrarEdit, productosFiltrados, ordenarNombre, ordenarPrecio, ordenarStock, setCategorias, activo, categorias }) {

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
        setProductos();
        setCategorias();
    }, []); //eslint-disable-line

    return (
        <div>
            <BuscarProducto />
            <BuscarCategorias />
            <button onClick={ordenNombre}>Ordenar A - Z</button>
            <button onClick={ordenStock}>Ordenar por Stock</button>
            <button onClick={ordenPrecio}>Ordenar por precio</button>

            <CrearProducto visible={mostrarForm} />
            <CambiarProducto visible={mostrarEdit} />
            <h1>Home screen</h1>
            <button onClick={setForm}>Crear producto</button>
            <div className='caja titulos'>
                <h2 className='elemento titu'>Nombre</h2>
                <h2 className='elemento'>Stock</h2>
                <h2 className='elemento'>Precio</h2>
                <h2 className='elemento'>Disponible</h2>
                <h2 className='elemento'>Categorias</h2>
            </div>
            <div>
                {!productos.length ? <h1>No hay productos disponibles</h1> : (productosFiltrados.length ? productosFiltrados : productos).map(el => {
                    return <Product key={el.id} id={el.id} name={el.name} imagen={el.imagen} stock={el.stock} price={el.price} avaible={el.avaible} Categories={el.Categories} />
                })}
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
        activo: state.activo,
        categorias: state.categorias
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setForm: () => dispatch(setForm()),
        setProductos: () => dispatch(setProductos()),
        setCategorias: () => dispatch(setCategorias()),
        ordenarNombre: (gatillo) => dispatch(ordenarNombre(gatillo)),
        ordenarPrecio: (gatillo) => dispatch(ordenarPrecio(gatillo)),
        ordenarStock: (gatillo) => dispatch(ordenarStock(gatillo)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);