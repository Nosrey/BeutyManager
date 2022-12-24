import React, { useState, useEffect } from 'react';
import Product from '../product/product.jsx'
import CrearProducto from '../crearProducto/crearProducto.jsx';
import { setForm, setProductos, ordenarNombre, ordenarPrecio, ordenarStock, setCategorias, setEdit } from '../../actions/index'
import { connect } from "react-redux";
import CambiarProducto from '../cambiarProducto/cambiarProducto.jsx';
import BuscarProducto from '../buscarProducto/buscarProducto.jsx';
import BuscarCategorias from '../buscarCategorias/buscarCategorias.jsx';
import './Home.css'

let gatilloNombre = true;
let gatilloPrecio = true;
let gatilloStock = true;

function Home({ mostrarForm, setForm, setProductos, productos, mostrarEdit, productosFiltrados, ordenarNombre, ordenarPrecio, ordenarStock, setCategorias, activo, categorias, setEdit }) {

    const paleta = ["text-fuchsia-400", "text-purple-500", "text-violet-500", "text-indigo-500", "text-blue-500", "text-sky-500", "text-cyan-500", "text-teal-500"]

    const bordes = ["border-fuchsia-400", "border-purple-500", "border-violet-500", "border-indigo-500", "border-blue-500", "border-sky-500", "border-cyan-500", "border-teal-500"]

    function colores(i) {
        i = getRndInteger(0, 8)
        let color = paleta[(i - 7) * -1]
        return color + ' inline m-1 border-2 ' + bordes[(i - 7) * -1] + ' px-1 py-0.5'
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

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


    function mostrarCategorias(arr) {
        // console.log('soy el arr prohibido de ' + name +': ' ,arr)
        if (arr.length) {
            let arrFinal = []
            for (let i = 0; i < arr.length; i++) {
                arrFinal.push(arr[i].name)
            }
            return arrFinal.join(', ')
        } else {
            return arr
        }
    }


    function primeraMayuscula(palabra) {
        if (palabra) {
            let palabrita = palabra.toLowerCase().split('');
            palabrita[0] = palabrita[0].toUpperCase();
            return '"' + palabrita.join('') + '"'
        }
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


    return (
        <div className='m-2'>
            <nav className='ml-1 mt-4'>
                <div className='ml-3'>
                    <BuscarProducto />
                    <BuscarCategorias />
                </div>
                <hr className='font-serif my-6' />
                <div className='text-xl'>
                    <button onClick={setForm} className="hover:animate-pulse bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 m-2 mx-5 rounded">Crear producto</button>

                    <button onClick={ordenNombre} className="hover:animate-pulse bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-2 m-2 mx-5 rounded">Ordenar A - Z</button>
                    <button onClick={ordenStock} className="hover:animate-pulse bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-2 m-2 mx-5 rounded">Ordenar por Stock</button>
                    <button onClick={ordenPrecio} className="hover:animate-pulse bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-2 m-2 mx-5 rounded">Ordenar por precio</button>
                </div>
            </nav>

            <CrearProducto visible={mostrarForm} />
            <CambiarProducto visible={mostrarEdit} />

            <ul className='font-serif flex flex-col items-center justify-center text-center my-6 mt-8 flex justify-around w-max'>
                <li className='font-serif flex flex-row w-screen text-2xl my-3 font-bold pl-4'>
                    <h2 className='font-serif flex-grow min-w-0 basis-0'>Nombre</h2>
                    <h2 className='font-serif flex-grow min-w-0 basis-0'>Stock</h2>
                    <h2 className='font-serif flex-grow min-w-0 basis-0'>Precio de venta</h2>
                    <h2 className='font-serif flex-grow min-w-0 basis-0'>Precio de compra</h2>
                    <h2 className='font-serif flex-grow min-w-0 basis-0'>Categorias</h2>
                    <h2 className='font-serif flex-grow min-w-0 basis-0'>Imagen</h2>
                    <h2 className='font-serif flex-grow min-w-0 basis-0'></h2>
                </li>

                {!productos.length ?
                    <li className='flex flex-col items-center'>
                        <h1 className='font-serif text-4xl text-center font-bold font-serif block mt-8'>No hay productos disponibles</h1>
                        <img className="w-1/3 absolute bottom-1" src="https://chryslergroup.navigation.com/static/WFS/Shop-Site/-/Shop/en_US/Product%20Not%20Found.png" alt="notFound" />
                    </li>
                    : (productosFiltrados.length ? productosFiltrados : productos).map(el => {
                        return <li className='font-serif flex flex-row w-screen text-xl odd:bg-white even:bg-slate-100 py-6 pl-4'>
                            {/* <Product key={el.id} id={el.id} name={el.name} imagen={el.imagen} stock={el.stock} price={el.price} avaible={el.avaible} Categories={el.Categories} /> */}

                            <h3 className='flex-grow min-w-0 basis-0 my-auto break-all'>{el.name}</h3>
                            <h3 className='flex-grow min-w-0 basis-0 my-auto'>{el.stock}</h3>
                            <h3 className='flex-grow min-w-0 basis-0 my-auto'>{el.price}</h3>
                            <h3 className='flex-grow min-w-0 basis-0 my-auto'>{el.priceBuy}</h3>

                            <h3 className='flex-grow min-w-0 basis-0 my-auto'>{el.Categories.length ?
                                <ul className='font-serif flex flex-wrap justify-center text-base'>
                                    {
                                        (comas(mostrarCategorias(el.Categories)).split(',')[0] !== '') ? (
                                            comas(mostrarCategorias(el.Categories)).split(',').map((el, i) => {
                                                return (
                                                    <li className={colores(i)}>{primeraMayuscula(el)}</li>
                                                )
                                            })

                                        ) : ''
                                    }

                                </ul>
                                : ''}
                            </h3>

                            <div className='flex-grow min-w-0 basis-0 my-auto'>
                                <img className='w-24 m-auto' src={el.imagen} alt="Product" />
                            </div>

                            <div className='flex-grow min-w-0 basis-0 my-auto flex flex-col items-center justify-center'>
                                <button className="hover:animate-pulse bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-3 mx-0 rounded block my-auto " onClick={() => setEdit(el.id, productos)}>Editar</button>
                            </div>
                        </li>
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
        setEdit: (id, productoLista) => dispatch(setEdit(id, productoLista)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);