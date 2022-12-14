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

            {/* <form class="flex items-center space-x-6">
                <div class="shrink-0">
                    <img class="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
                </div>
                <label class="block">
                    <span class="sr-only">Choose profile photo</span>
                    <input type="file" class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
                </label>
            </form> */}

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