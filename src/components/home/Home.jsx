import React, { useState, useEffect } from 'react';
import CrearProducto from '../crearProducto/crearProducto.jsx';
import { setForm, setProductos, ordenarNombre, ordenarPrecio, ordenarStock, setCategorias, setEdit, ordenarDeposito, ordenarTotal, ordenarPrecioCompra, cambiarStock, filtrarProductos, ordenarCodigo, cambiarGatilloEliminar } from '../../actions/index'
import { connect } from "react-redux";
import CambiarProducto from '../cambiarProducto/cambiarProducto.jsx';
import BuscarProducto from '../buscarProducto/buscarProducto.jsx';
// importo axios
import Axios from 'axios';
import './Home.css'
import addBtn from '../../images/addBtn.png'
// importar editBtn
import editBtn from '../../images/editBtn.png'
// importar transferBtn
import transferBtn from '../../images/transferBtn.png'
// importar imagen bannerMorado
import bannerMorado from '../../images/bannerMorado.png'
// importar rightArrow.png
import rightArrow from '../../images/rightArrow.png'
// importar leftArrow.png
import leftArrow from '../../images/leftArrow.png'

const ip = "https://vercel-api-hazel-five.vercel.app"
const ipPagina = "https://inventorymanager.onrender.com"

// exporto las constantes ip e ipPagina
export { ip, ipPagina }

let gatilloNombre = true;
let gatilloStock = true;

function Home({ mostrarForm, setForm, setProductos, productos, mostrarEdit, productosFiltrados, ordenarNombre, ordenarPrecio, ordenarStock, setCategorias, activo, categorias, setEdit, input1, ordenarDeposito, ordenarTotal, ordenarPrecioCompra, cambiarStock, productoToEdit, filtrarProductos, ordenarCodigo, gatilloEliminar, cambiarGatilloEliminar }) {

    // declaro con useState numeroDeposito y numeroStock
    const [numeroDeposito, setNumeroDeposito] = useState(0);
    const [numeroStock, setNumeroStock] = useState(0);
    // declaro un estado controlado para el input donde sumare o restare diferencias entre stock y stockDeposito
    const [numeroBase, setNumeroBase] = useState(0);
    // declaro el estado gatilloCambiar
    const [gatilloCambiar, setGatilloCambiar] = useState(false);
    // declaro el estado sumarORestar en true
    const [sumarORestar, setSumarORestar] = useState(true);

    const flechaImagen = 'https://cdn-icons-png.flaticon.com/512/37/37808.png'

    const ordenNombre = function () {
        ordenarNombre(gatilloNombre)
        gatilloNombre = !gatilloNombre
    }

    const ordenStock = function () {
        ordenarStock(gatilloStock)
        gatilloStock = !gatilloStock
    }

    function sumarRestar(num2, num3, bool) {
        let { pnumeroBase } = document.forms[0];
        console.log('soy tu numero: ', pnumeroBase.value)

        let productData = {}

        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === productoToEdit.id) productData = productos[i]
        }

        productData.categoryNames = [];

        if (bool) {
            if (Number(num2) - Number(pnumeroBase.value) > 0) {
                // aplicar la resta y suma
                num2 = Number(num2) - Number(pnumeroBase.value)
                num3 = Number(num3) + Number(pnumeroBase.value);
            } else {
                // sumarle a num3 el valor de num2 y poner num2 en 0
                num3 = Number(num3) + Number(num2);
                num2 = Number(num2) - Number(num2);
            }

            //asignar a productData los valores de num2 y num3 a stock y stockDeposito
            productData.stockDeposito = Number(num2);
            productData.stock = Number(num3);

            console.log('soy el producto: ', productData)

            Axios.put(ip  + '/products/' + productoToEdit.id, productData)
                .then(() => alert('fue editado correctamente'))
                .then(() => setProductos()) // para pedir los productos actualizados
                .then(() => setCategorias()) // para pedir los productos actualizados
                .then(() => {  // vaciamos el formulario
                    // pongo en cero numeroBase
                    setNumeroBase(0);
                    // desactivo gatilloCambiar
                })
                .then(() => setGatilloCambiar(false))
                .then(() => {
                    filtrarProductos(productos, '') // actualizamos el filtro al crear un nuevo producto
                })
                // pongo sumarORestar en true de nuevo
                .then(() => setSumarORestar(true))
                .catch((err) => {
                    console.log(err.response.data);
                })



        } else {
            // hago lo mismo que arriba pero invirtiendo num1 y num2
            if (Number(num3) - Number(pnumeroBase.value) > 0) {
                // aplicar la resta y suma
                num2 = Number(num2) + Number(pnumeroBase.value)
                num3 = Number(num3) - Number(pnumeroBase.value);
                // enviar como .put los numeros resueltos
            } else {
                // sumarle a num2 el valor de num3 y poner num3 en 0
                num2 = Number(num2) + Number(num3);
                num3 = Number(num3) - Number(num3);
            }

            //asignar a productData los valores de num2 y num3 a stock y stockDeposito
            productData.stockDeposito = Number(num2);
            productData.stock = Number(num3);

            console.log('soy el producto: ', productData)

            Axios.put(ip  + '/products/' + productoToEdit.id, productData)
                .then(() => alert('fue editado correctamente'))
                .then(() => setProductos()) // para pedir los productos actualizados
                .then(() => setCategorias()) // para pedir los productos actualizados
                .then(() => {  // vaciamos el formulario
                    // pongo en cero numeroBase
                    setNumeroBase(0);
                    // desactivo gatilloCambiar
                })
                .then(() => setGatilloCambiar(false))
                .then(() => {
                    filtrarProductos(productos, '') // actualizamos el filtro al crear un nuevo producto
                })
                // pongo sumarORestar en true de nuevo
                .then(() => setSumarORestar(true))
                .catch((err) => {
                    console.log(err.response.data);
                })



        }
    }

    function eliminar() {
        Axios.delete(ip + '/products/' + productoToEdit.id, { id: productoToEdit.id })
        .then(() => setProductos())
        .then(() => setCategorias()) // para pedir los productos actualizados
        .then(() => {
            cambiarGatilloEliminar()
        })
        .catch((err) => {
            console.log('error en eliminar producto: ', err.response.data);
        })
    }


    useEffect(() => {
        // Your code here
        setProductos();
        setCategorias();
    }, []); //eslint-disable-line

    // implemento un useEffect que actualiza los estados de numeroDeposito y numeroStock solo cuando la variable productoToEdit reciba algun cambio
    useEffect(() => {
        setNumeroDeposito(productoToEdit.stockDeposito);
        setNumeroStock(productoToEdit.stock);
    }, [productoToEdit]) //eslint-disable-line

    return (
        <div className=''>
            {/*un div que sirve para header e interfaz de busqueda*/}
            <div className={
                (gatilloCambiar) ? 'w-screen h-screen fixed bg-slate-50 z-20 opacity-70 blur-sm' : 'hidden'
            }>
            </div>

            <div className={
                (gatilloEliminar) ? 'w-screen h-screen fixed bg-slate-50 z-20 opacity-70 blur-sm' : 'hidden'
            }>
            </div>

            <div className={(gatilloEliminar) ? 'text-4xl rounded-xl w-[80%] xl:w-[30%] fixed top-[30%] left-[10%] xl:left-[35%] z-30' : 'hidden'}>
                <button className='bg-sky-500' onClick={eliminar}>
                    si
                </button>
                <button className='bg-sky-500'>
                    No
                </button>
            </div>

                <div className={
                    (gatilloCambiar) ? 'text-4xl rounded-xl w-[80%] xl:w-[30%] fixed top-[30%] left-[10%] xl:left-[35%] z-30' : 'hidden'
                }>
                    <div className=' bg-white border shadow text-center rounded-2xl p-1 xl:p-3'>
                        <form className=' flex flex-col' onSubmit={(e) => { e.preventDefault(); sumarRestar(productoToEdit.stockDeposito, productoToEdit.stock, sumarORestar) }}>
                            <button className=' my-1' type='button' onClick={() => setSumarORestar(!sumarORestar)}>
                                <div className='hover:w-[95%] hover:animate-pulse mx-auto w-[90%] flex flex-col justify-center items-center text-lg  '>
                                    <img alt='arrowRight' src={(sumarORestar) ? rightArrow : leftArrow} className=' w-full' />
                                </div>
                            </button>
                            <div className='flex flex-row mx-auto inline items-center justify-center'>
                                <h4 className=' w-[25%] inline'>{numeroDeposito}</h4>
                                <input className='w-1/4 text-center' type='number' placeholder='0' name='pnumeroBase' value={numeroBase} onChange={(e) => {
                                    // estableco el formulario controlado para este input
                                    setNumeroBase(e.target.value)
                                }} />
                                <h4 className=' w-[25%] inline'>{numeroStock}</h4>
                            </div>
                            <div className='flex flex-row mx-auto mt-5 mb-1'>
                                <button className='mx-4 m-0 text-lg bg-indigo-500 text-white px-3 font-semibold py-0.5 rounded-md  text-md text-2xl xl:text-3xl shadow-sm hover:text-4xl hover:animate-bounce italic p-10' type='button' onClick={() => { setGatilloCambiar(false); setSumarORestar(true) }}>Cerrar</button>
                                <button className='mx-4 m-0 text-lg bg-indigo-500 text-white px-3 font-semibold py-0.5 rounded-md text-md text-2xl xl:text-3xl shadow-sm hover:text-4xl hover:animate-bounce  italic p-1' type='submit'>Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>

                <nav className={"flex flex-col bg-violet-900 py-3 pt-3 pt-0 bg-[url(" + bannerMorado + ")]"}>
                    <BuscarProducto />

                    <button onClick={setForm} className='z-10 hover:bg-slate-50 text-xl flex flex-row mb-1 mx-10 xl:ml-10 xl:fixed items-center xl:bottom-0 xl:right-0 xl:mr-0 bg-white border p-3 pr-4 py-2 xl:py-3 shadow rounded-lg hover:animate-pulse items-center justify-center'>
                        <h1 className='mr-3 inline text-black font-bold text-1xl'>Agregar Producto</h1>
                        <img className='inline rounded text-base xl:text-xl w-8' src={addBtn} alt='addBtn' />
                    </button>
                </nav>

                <CrearProducto visible={mostrarForm} />
                <CambiarProducto visible={mostrarEdit} />
                <div className='w-screen overflow-x-auto'>
                    {(input1.length && !productosFiltrados.length) ? <h1 className='text-center text-xl xl:text-2xl font-serif bg-red-600 mx-3 xl:mx-20 text-white font-bold py-2 xl:py-4 my-2 xl:my-6 rounded'>No hay productos que coincidan con tu busqueda</h1> : null}

                    <ul className='font-serif flex flex-col items-center justify-center text-center my-6 mt-0 flex justify-around overflow-x-auto w-[315%] xl:w-screen'>
                        <li className='font-serif flex flex-row xl:text-2xl my-3 font-bold px-2 pl-1 pr-3 flex w-full shadow pb-3'>
                            <h2 className='font-serif flex-grow min-w-0 basis-0'>Imagen</h2>
                            <div className='font-serif flex-grow min-w-0 basis-0 flex flew-row items-center '>
                                {/* boton con una imagen dada */}
                                <button onClick={() => ordenarCodigo(productos, productosFiltrados, activo)} className='flex flex-row items-center hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic'>
                                    <img className='w-6 h-6 mr-1' src={flechaImagen} alt='flecha' />
                                    <h2>Codigo</h2>
                                </button>
                            </div>
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
                                    <h2>Tienda</h2>
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
                                return <li className='font-serif flex flex-row text-xl py-6 px-2 pl-1 pr-3 odd:bg-white even:bg-slate-100 w-full relative'>
                                    <div className='flex-grow min-w-0 basis-0 my-auto'>
                                        <img className='w-24 m-auto' src={el.imagen} alt="Product" />
                                    </div>
                                    <h3 className='flex-grow min-w-0 basis-0 my-auto static'>{'#' + el.id}</h3>
                                    <h3 className='flex-grow min-w-0 basis-0 my-auto break-normal static'>{el.name}</h3>
                                    <h3 className='flex-grow min-w-0 basis-0 my-auto text-3xl'>{el.stockDeposito}</h3>
                                    <h3 className='flex-grow min-w-0 basis-0 my-auto text-3xl'>{el.stock}</h3>

                                    <button className="absolute top-12 left-[41.9%]  hover:animate-pulse font-bold px-1 py-1 xl:py-3 xl:px-2 mx-1 mx-0 rounded block my-auto flex flex-row items-center justify-center " onClick={() => { cambiarStock(el.id, productos); setGatilloCambiar(true) }}>
                                        <img src={transferBtn} alt='transferArrow' className=' w-9 h-auto ml-2 hover:w-8 hover:h-8' />
                                    </button>

                                    <h3 className='flex-grow min-w-0 basis-0 my-auto text-4xl font-bold'>{el.stock + el.stockDeposito}</h3>
                                    <h3 className='flex-grow min-w-0 basis-0 my-auto text-4xl font-bold'>{'$' + el.price}</h3>
                                    <h3 className='flex-grow min-w-0 basis-0 my-auto text-4xl font-bold'>{el.priceBuy + '$'}</h3>

                                    <div className='flex-grow min-w-0 basis-0 my-auto flex flex-col items-center justify-center'>
                                        <button className="hover:animate-pulse font-bold px-1 py-1 xl:py-3 xl:px-2 mx-1 mx-0 rounded block my-auto flex flex-row items-center justify-center  hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:text-2xl" onClick={() => setEdit(el.id, productos)}>
                                            <h4>Editar</h4>
                                            <img src={editBtn} alt='pencil' className='w-6 h-6 ml-2 hover:w-8 hover:h-8' />
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
        // implemento productoToEdit
        productoToEdit: state.productoToEdit,
        // traigo gatillo eliminar del reducer
        gatilloEliminar: state.gatilloEliminar,
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
        // implemento cambiarStock
        cambiarStock: (id, lista) => dispatch(cambiarStock(id, lista)),
        // implemento filtrarProductos
        filtrarProductos: (input1, lista) => dispatch(filtrarProductos(input1, lista)),
        // implemento ordenarCodigo
        ordenarCodigo: (lista, lista2, gatillo) => dispatch(ordenarCodigo(lista, lista2, gatillo)),
        // implementar cambiarGatilloEliminar
        cambiarGatilloEliminar: () => dispatch(cambiarGatilloEliminar()),
    };
}

            export default connect(mapStateToProps, mapDispatchToProps)(Home);