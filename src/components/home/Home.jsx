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
            <hr className='my-6'/>
            <div>
                <button onClick={setForm} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 m-2 rounded">Crear producto</button>

                <button onClick={ordenNombre} className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-2 m-2 rounded">Ordenar A - Z</button>
                <button onClick={ordenStock} className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-2 m-2 rounded">Ordenar por Stock</button>
                <button onClick={ordenPrecio} className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-2 m-2 rounded">Ordenar por precio</button>
            </div>

            <CrearProducto visible={mostrarForm} />
            <CambiarProducto visible={mostrarEdit} />

            <div className='caja titulos'>
                <h2 className='elemento titu'>Nombre</h2>
                <h2 className='elemento'>Stock</h2>
                <h2 className='elemento'>Precio</h2>
                <h2 className='elemento'>Disponible</h2>
                <h2 className='elemento'>Categorias</h2>
            </div>
            <ul>
                {!productos.length ? <li><h1>No hay productos disponibles</h1></li> : (productosFiltrados.length ? productosFiltrados : productos).map(el => {
                    return <li className="odd:bg-white even:bg-slate-50"><Product key={el.id} id={el.id} name={el.name} imagen={el.imagen} stock={el.stock} price={el.price} avaible={el.avaible} Categories={el.Categories} /></li>
                })}
            </ul>
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