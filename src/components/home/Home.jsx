import React, { useEffect } from 'react';
import CrearProducto from '../crearProducto/crearProducto.jsx';
import { setForm, setProductos, ordenarNombre, ordenarPrecio, ordenarStock, setCategorias, setEdit, ordenarDeposito, ordenarTotal, ordenarPrecioCompra } from '../../actions/index'
import { connect } from "react-redux";
import CambiarProducto from '../cambiarProducto/cambiarProducto.jsx';
import BuscarProducto from '../buscarProducto/buscarProducto.jsx';
// import BuscarCategorias from '../buscarCategorias/buscarCategorias.jsx';
import './Home.css'
import addBtn from '../../images/addBtn.png'
// importar editBtn
import editBtn from '../../images/editBtn.png'

let gatilloNombre = true;
let gatilloStock = true;

function Home({ mostrarForm, setForm, setProductos, productos, mostrarEdit, productosFiltrados, ordenarNombre, ordenarPrecio, ordenarStock, setCategorias, activo, categorias, setEdit, input1, ordenarDeposito, ordenarTotal, ordenarPrecioCompra }) {

    // const paleta = ["text-fuchsia-400", "text-purple-500", "text-violet-500", "text-indigo-500", "text-blue-500", "text-sky-500", "text-cyan-500", "text-teal-500"]

    // const bordes = ["border-fuchsia-400", "border-purple-500", "border-violet-500", "border-indigo-500", "border-blue-500", "border-sky-500", "border-cyan-500", "border-teal-500"]

    const flechaImagen = 'https://cdn-icons-png.flaticon.com/512/37/37808.png'

    // function colores(i) {
    //     i = getRndInteger(0, 8)
    //     let color = paleta[(i - 7) * -1]
    //     return color + ' inline m-1 border-2 ' + bordes[(i - 7) * -1] + ' px-1 py-0.5'
    // }

    // function getRndInteger(min, max) {
    //     return Math.floor(Math.random() * (max - min)) + min;
    // }

    const ordenNombre = function () {
        ordenarNombre(gatilloNombre)
        gatilloNombre = !gatilloNombre
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

    // function mostrarCategorias(arr) {
    //     // console.log('soy el arr prohibido de ' + name +': ' ,arr)
    //     if (arr.length) {
    //         let arrFinal = []
    //         for (let i = 0; i < arr.length; i++) {
    //             arrFinal.push(arr[i].name)
    //         }
    //         return arrFinal.join(', ')
    //     } else {
    //         return arr
    //     }
    // }

    // function primeraMayuscula(palabra) {
    //     if (palabra) {
    //         let palabrita = palabra.toLowerCase().split('');
    //         palabrita[0] = palabrita[0].toUpperCase();
    //         return '"' + palabrita.join('') + '"'
    //     }
    // }

    // function comas(valorArray) {
    //     valorArray = valorArray.split('')
    //     for (let i = 0; i < valorArray.length; i++) {  // para quitar espacio post comas
    //         if (valorArray[i + 1] === ' ' && valorArray[i] === ',') {
    //             valorArray.splice(i + 1, 1)
    //             i = 0;
    //         }
    //     }
    //     return valorArray.join('')
    // }

    return (
        <div className=''>
            {/*un div que sirve para header e interfaz de busqueda*/}
            <nav className='flex flex-col bg-violet-900 py-3 pt-0'>
                <BuscarProducto />

                <button onClick={setForm} className='hover:bg-slate-50 text-xl flex flex-row mb-1 mx-10 xl:ml-10 xl:fixed items-center xl:bottom-0 xl:right-0 xl:mr-0 bg-white border p-3 pr-4 py-2 xl:py-3 shadow rounded-lg hover:animate-pulse items-center justify-center'>
                    <h1 className='mr-3 inline text-black font-bold text-1xl'>Agregar Producto</h1>
                    <img className='inline rounded text-base xl:text-xl w-8' src={addBtn} alt='addBtn' />
                </button>
            </nav>
 

            <CrearProducto visible={mostrarForm} />
            <CambiarProducto visible={mostrarEdit} />
            <div className='w-screen overflow-x-auto'>
                {(input1.length && !productosFiltrados.length) ? <h1 className='text-center text-xl xl:text-2xl font-serif bg-red-600 mx-3 xl:mx-20 text-white font-bold py-2 xl:py-4 my-2 xl:my-6 rounded'>No hay productos que coincidan con tu busqueda</h1> : null}

                <ul className='font-serif flex flex-col items-center justify-center text-center my-6 mt-6 flex justify-around overflow-x-auto w-[280%] xl:w-screen'>
                    <li className='font-serif flex flex-row xl:text-2xl my-3 font-bold pl-4 flex w-full'>
                        <h2 className='font-serif flex-grow min-w-0 basis-0'>Imagen</h2>
                        <div className='font-serif flex-grow min-w-0 basis-0 flex flew-row items-center'>
                            {/* boton con una imagen dada */}
                            <button onClick={ordenNombre} className='flex flex-row items-center hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic'>
                                <img className='w-6 h-6 mr-1' src={flechaImagen} alt='flecha' />
                                <h2>Nombre</h2>
                            </button>
                        </div>

                        <div className='font-serif flex-grow min-w-0 basis-0 flex flew-row items-center '>
                            {/* boton con una imagen dada */}
                            <button onClick={() => ordenarDeposito(productos, productosFiltrados, activo)} className='flex flex-row items-center hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic'>
                                <img className='w-6 h-6 mr-1' src={flechaImagen} alt='flecha' />
                                <h2>Deposito</h2>
                            </button>
                        </div>

                        <div className='font-serif flex-grow min-w-0 basis-0 flex flew-row items-center '>
                            {/* boton con una imagen dada */}
                            <button onClick={ordenStock} className='flex flex-row items-center hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic'>
                                <img className='w-6 h-6 mr-1' src={flechaImagen} alt='flecha' />
                                <h2>Stock</h2>
                            </button>
                        </div>

                        <div className='font-serif flex-grow min-w-0 basis-0 flex flew-row items-center '>
                            {/* boton con una imagen dada */}
                            <button onClick={() => ordenarTotal(productos, productosFiltrados, activo)} className='flex flex-row items-center hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic'>
                                <img className='w-6 h-6 mr-1' src={flechaImagen} alt='flecha' />
                                <h2>Total</h2>
                            </button>
                        </div>

                        <div className='font-serif flex-grow min-w-0 basis-0 flex flew-row items-center'>
                            {/* boton con una imagen dada */}
                            <button onClick={() => ordenarPrecio(productos, productosFiltrados, activo)} className='flex flex-row items-center justify-center hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic'>
                                <img className='w-6 h-6 mr-1' src={flechaImagen} alt='flecha' />
                                <h2>Venta</h2>
                            </button>
                        </div>

                        <div className='font-serif flex-grow min-w-0 basis-0 flex flew-row items-center  '>
                            {/* boton con una imagen dada */}
                            <button onClick={() => ordenarPrecioCompra(productos, productosFiltrados, activo)} className='flex flex-row items-center justify-center hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic'>
                                <img className='w-6 h-6 mr-1' src={flechaImagen} alt='flecha' />
                                <h2 className=''>Compra</h2>
                            </button>
                        </div>
                        {/* <h2 className='font-serif flex-grow min-w-0 basis-0'>Categorias</h2> */}
                        <h2 className='font-serif flex-grow min-w-0 basis-0'> </h2>
                    </li>

                    {!productos.length ?
                        <li className='w-full flex flex-col items-center justify-center xl:mt-6 italic'>
                            <h1 className='font-serif text-2xl xl:text-4xl mx-auto font-bold font-serif block mt-0'>No hay productos disponibles</h1>
                            <img className="w-3/4 xl:w-1/2 bottom-1" src="https://chryslergroup.navigation.com/static/WFS/Shop-Site/-/Shop/en_US/Product%20Not%20Found.png" alt="notFound" />
                        </li>


                        : (productosFiltrados.length ? productosFiltrados : productos).map(el => {
                            // permitir que mi elemento li se expanda a lo anchos de la pantalla
                            return <li className='font-serif flex flex-row text-xl py-6 pl-4 odd:bg-white even:bg-slate-100 w-full '>
                                <div className='flex-grow min-w-0 basis-0 my-auto'>
                                    <img className='w-24 m-auto' src={el.imagen} alt="Product" />
                                </div>
                                <h3 className='flex-grow min-w-0 basis-0 my-auto break-all static'>{el.name}</h3>
                                <h3 className='flex-grow min-w-0 basis-0 my-auto text-3xl'>{el.stockDeposito}</h3>
                                <h3 className='flex-grow min-w-0 basis-0 my-auto text-3xl'>{el.stock}</h3>
                                <h3 className='flex-grow min-w-0 basis-0 my-auto text-4xl font-bold'>{el.stock + el.stockDeposito}</h3>
                                <h3 className='flex-grow min-w-0 basis-0 my-auto text-4xl font-bold'>{el.price + '$'}</h3>
                                <h3 className='flex-grow min-w-0 basis-0 my-auto text-4xl font-bold'>{el.priceBuy + '$'}</h3>

                                {/* <h3 className='flex-grow min-w-0 basis-0 my-auto'>{el.Categories.length ?
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
                                </h3> */}



                                <div className='flex-grow min-w-0 basis-0 my-auto flex flex-col items-center justify-center'>
                                    <button className="hover:animate-pulse font-bold px-1 py-1 xl:py-3 xl:px-2 mx-1 mx-0 rounded block my-auto flex flex-row items-center justify-center " onClick={() => setEdit(el.id, productos)}>
                                        <h4>Editar</h4>
                                        <img src={editBtn} alt='pencil' className='w-6 h-6 ml-2 hover:w-8 hover:h-8'/>
                                    </button>
                                </div>
                            </li>
                        })}
                </ul>
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
        categorias: state.categorias,
        // importar de mi reducer el estado input1
        input1: state.input1,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setForm: () => dispatch(setForm()),
        setProductos: () => dispatch(setProductos()),
        setCategorias: () => dispatch(setCategorias()),
        ordenarNombre: (gatillo) => dispatch(ordenarNombre(gatillo)),
        ordenarPrecio: (lista, lista2, gatillo) => dispatch(ordenarPrecio(lista, lista2, gatillo)),
        ordenarStock: (gatillo) => dispatch(ordenarStock(gatillo)),
        setEdit: (id, productoLista) => dispatch(setEdit(id, productoLista)),
        ordenarDeposito: (lista, lista2, gatillo) => dispatch(ordenarDeposito(lista, lista2, gatillo)),
        ordenarTotal: (lista, lista2, gatillo) => dispatch(ordenarTotal(lista, lista2, gatillo)),
        ordenarPrecioCompra: (lista, lista2, gatillo) => dispatch(ordenarPrecioCompra(lista, lista2, gatillo)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);