import React, { useState, useEffect } from 'react';
// importo history de react router dom
import { useNavigate } from 'react-router-dom'
import CrearProducto from '../crearProducto/crearProducto.jsx';
import { setForm, setProductos, ordenarNombre, ordenarPrecio, ordenarStock, setEdit, ordenarDeposito, ordenarTotal, ordenarPrecioCompra, cambiarStock, filtrarProductos, ordenarCodigo, cambiarGatilloEliminar, cambiarPagina } from '../../actions/index'
import { connect } from "react-redux";
import CambiarProducto from '../cambiarProducto/cambiarProducto.jsx';
import BuscarProducto from '../buscarProducto/buscarProducto.jsx';
// importo el componente eliminarProducto.jsx
import EliminarProducto from '../eliminarProducto/eliminarProducto.jsx'
// importo axios
import Axios from 'axios';
import './Home.css'
import addBtn2 from '../../images/addBtn2.png'
// importo la imagen removeBtn
import removeBtn from '../../images/removeBtn.png'
// importar editBtn
import editBtn from '../../images/editBtn.png'
// importar transferBtn
import transferBtn from '../../images/transferBtn.png'
// importar imagen bannerMorado
import bannerMorado from '../../images/bg2.jpg'
import bannerMorado3 from '../../images/bg3b.jpg'
import bannerMorado2 from '../../images/bg3.jpg'
import groupImage from '../../images/groupImage.png'
// importar rightArrow.png
import rightArrow from '../../images/rightArrow.png'
// importar leftArrow.png
import leftArrow from '../../images/leftArrow.png'
// importo paginado.jsx
import Paginado from '../paginado/paginado.jsx'
// importo el componente botonSumar
import BotonSumar from '../botonSumar/botonSumar.jsx'
// importo boton3bars.png
import boton3bars from '../../images/boton3bars.png'
// importo loadingIcon
import loadingIcon from '../../images/loadingIcon.png'
// importo OpcionesMobile.jsx
import OpcionesMobile from '../OpcionesMobile/OpcionesMobile.jsx'
import CrearGrupo from '../CrearGrupo/CrearGrupo.jsx';
import { ipRuta } from '../../App';



const ip = "https://vercel-api-hazel-five.vercel.app"
// const ip = "http://localhost:3001"
const ipPagina = "https://inventorymanager.onrender.com"

const cantidadPagina = 25

// exporto las constantes ip e ipPagina
export { ip, ipPagina, addBtn2, removeBtn }

let gatilloNombre = true;
let gatilloStock = true;


function Home({ mostrarForm, setForm, setProductos, productos, mostrarEdit, productosFiltrados, ordenarNombre, ordenarPrecio, ordenarStock, activo, categorias, setEdit, input1, ordenarDeposito, ordenarTotal, ordenarPrecioCompra, cambiarStock, productoToEdit, filtrarProductos, ordenarCodigo, gatilloEliminar, cambiarGatilloEliminar, pagina, cambiarPagina }) {

    document.addEventListener("backbutton", function () { }, false);

    const navigate = useNavigate()

    useEffect(() => {
        const unlisten = navigate((location, action) => {
            // Verificamos que el cambio en la ruta se ha producido al presionar el botón de retroceso
            if (action === 'POP') {
                if (window.android) {
                    // Detecta cuando se presiona el botón de retroceder en el navegador
                    if (mostrarEdit || mostrarForm) {
                        // Desactiva la variable
                        if (mostrarForm) setForm()
                        if (mostrarEdit) setEdit(productoToEdit.id, productos)
                    } else {
                        window.android.minimize();
                    }
                }
            }
        });

        return () => {
            // Revisamos si unlisten es una función primero
            if (typeof unlisten === 'function') unlisten();
        };
        // eslint-disable-next-line
    }, [mostrarEdit, mostrarForm, navigate]);


    // declaro estados para mi componente cambiarProducto
    const [precio, setPrecio] = useState(productoToEdit.price)
    const [precioCompra, setPrecioCompra] = useState(productoToEdit.priceBuy)
    const [stock, setStock] = useState(productoToEdit.stock)
    const [stockDeposito, setStockDeposito] = useState(productoToEdit.stockDeposito)
    // creo un estado para mostrar la imagen en grande que llevara un booleano para activarla
    const [gatilloImagen, setGatilloImagen] = useState({ gatillo: false, imagen: '' });
    // creo el estado para mostrar o ocultar el menu de opciones
    const [gatilloOpciones, setGatilloOpciones] = useState(false);
    // declaro con useState numeroDeposito y numeroStock
    const [numeroDeposito, setNumeroDeposito] = useState(0);
    const [numeroStock, setNumeroStock] = useState(0);
    // declaro un estado controlado para el input donde sumare o restare diferencias entre stock y stockDeposito
    const [numeroBase, setNumeroBase] = useState(0);
    // declaro el estado gatilloCambiar
    const [gatilloCambiar, setGatilloCambiar] = useState(false);
    // declaro el estado sumarORestar en true
    const [sumarORestar, setSumarORestar] = useState(true);

    // declaro el estado gatilloSumar para activar la interfaz de sumar productos
    const [gatilloSumar, setGatilloSumar] = useState(false);
    // ahora creo el estado numeroASumar para establecer el numero que editare desde dicha interfaz
    const [numeroASumar, setNumeroASumar] = useState({});
    // creo el estado cargando que contendra un booleando para controlar si se activa la pantalla de carga o se apaga
    const [cargando, setCargando] = useState(false);
    const [gatilloGrupo, setGatilloGrupo] = useState(false);
    const [grupoTemporal, setGrupoTemporal] = useState('');
    const [grupoSeleccionado, setGrupoSeleccionado] = useState('Sin grupo');

    const flechaImagen = 'https://cdn-icons-png.flaticon.com/512/37/37808.png'

    const ordenNombre = function () {
        ordenarNombre(gatilloNombre)
        gatilloNombre = !gatilloNombre
    }

    const ordenStock = function () {
        ordenarStock(gatilloStock)
        gatilloStock = !gatilloStock
    }

    // creo un useEffect para cuando numeroBase cambie, si el valor escrito no es un numero entonces este cambia a 0
    useEffect(() => {
        // reviso numero a numero el valor de la constante numeroBase, si alguno de esos valores no es un numero lo elimino, por ejemplo si esta escrito 051 y luego cambia a "051a" la ultima "a" unicamente es la eliminada
        let numeroBaseEditable = numeroBase
        for (let i = 0; i < numeroBase.length; i++) {
            if (isNaN(numeroBase[i])) {
                numeroBaseEditable = numeroBaseEditable.replace(numeroBase[i], '')
            }
        }
        // ahora si numeroBaseEditable es un numero entonces lo asigno a numeroBase
        if (!isNaN(numeroBaseEditable)) {
            setNumeroBase(numeroBaseEditable)
        } else {
            setNumeroBase(0)
        }

    }, [numeroBase])


    function sumarRestar(num2, num3, bool) {
        setCargando(true)
        let { pnumeroBase } = document.forms[0];
        if (pnumeroBase.value < 0 || pnumeroBase.value === '' || pnumeroBase.value === ' ') {
            pnumeroBase.value = 0
        }

        let productData = {}

        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === productoToEdit.id) productData = productos[i]
        }

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
        }

        Axios.put(ip + '/products/' + productoToEdit.id, productData)
            .then(() => setProductos(input1, productos)) // para pedir los productos actualizados
            .then(() => {  // vaciamos el formulario
                // pongo en cero numeroBase
                setNumeroBase(0);
                // desactivo gatilloCambiar
            })
            .then(() => setGatilloCambiar(false))
            // pongo sumarORestar en true de nuevo
            .then(() => {
                setSumarORestar(true)
                setCargando(false)
            })
            .catch((err) => {
                console.log('sucedio un error: ', err.response.data);
                setCargando(false);
            })

    }

    useEffect(() => {
        // Your code here
        setProductos(input1);
    }, []); //eslint-disable-line

    // implemento un useEffect que actualiza los estados de numeroDeposito y numeroStock solo cuando la variable productoToEdit reciba algun cambio
    useEffect(() => {
        setNumeroDeposito(productoToEdit.stockDeposito);
        setNumeroStock(productoToEdit.stock);
    }, [productoToEdit]) //eslint-disable-line

    // un useEffect donde si productoToEdit o productos cambian entonces se revisa una lista en base a esta foruma (productosFiltrados.length? productosFiltrados : productos).slice((pagina * 10) -10, (pagina * 10)) y si la longitud de la lista es menor a 1 entonces la pagina se retrocede en 1 a traves de cambiarPagina(pagina - 1)
    useEffect(() => {
        if (productos.length) {
            if (productosFiltrados.length) {
                if ((productosFiltrados.slice((pagina * cantidadPagina) - cantidadPagina, (pagina * cantidadPagina))).length < 1) {
                    cambiarPagina(pagina - 1)
                }
            } else {
                if ((productos.slice((pagina * cantidadPagina) - cantidadPagina, (pagina * cantidadPagina))).length < 1) {
                    cambiarPagina(pagina - 1)
                }
            }
            if (pagina <= 0) cambiarPagina(1)
        }
        else {
            cambiarPagina(1)
        }

    }, [productosFiltrados, productos, pagina]) //eslint-disable-line

    const [gruposJuntos, setGruposJuntos] = useState([]);
    const [activarGrupos, setActivarGrupos] = useState(false);
    // creo una funcion que se llama mostrarGrupos la cual pone activarGrupos en su opuesto (true or false)
    const mostrarGrupos = () => {
        setActivarGrupos(!activarGrupos)
        let totalPorGrupo = [];
        // reviso mi array de productos y busco en sus propiedades "group" y tomo uno de cada uno, luego contabilizo cuantos productos tienen el mismo group y los ordeno en un objeto con esta estructura {group: "nombre del group", total: stock + stockDeposito}
        for (let i = 0; i < productos.length; i++) {
            if (!totalPorGrupo.includes(productos[i].group)) {
                totalPorGrupo.push(productos[i].group)
            }
        }
        let totalPorGrupoCantidades = [];
        for (let i = 0; i < totalPorGrupo.length; i++) {
            let total = 0;
            let totalStock = 0;
            let totalStockDeposito = 0;
            let totalPrice = 0;
            let totalPriceBuy = 0;
            let cantidad = 0
            for (let j = 0; j < productos.length; j++) {
                if (productos[j].group === totalPorGrupo[i]) {
                    cantidad = cantidad + 1;
                    total = total + productos[j].stock + productos[j].stockDeposito;
                    totalStock = totalStock + productos[j].stock;
                    totalStockDeposito = totalStockDeposito + productos[j].stockDeposito;
                    // en totalPrice guardo el promedio de la suma de todos los precios de los productos por ejemplo, el promedio de dos productos con precio de 2 es (2 + 2) / cantidad (es decir 2) dando en promedio 2
                    totalPrice = totalPrice + productos[j].price
                    totalPriceBuy = totalPriceBuy + productos[j].priceBuy
                }
            }
            totalPorGrupoCantidades.push({ group: totalPorGrupo[i], total: total, totalStock: totalStock, totalStockDeposito: totalStockDeposito, totalPrice: (totalPrice / cantidad), totalPriceBuy: (totalPriceBuy / cantidad) })
        }
        // le asigno a gruposJuntos un array de objetos igual a la de productos para mostrarlos en la tabla
        let objetoFinal = [];
        for (let i = 0; i < totalPorGrupoCantidades.length; i++) {
            let item = {
                id: i,
                name: totalPorGrupoCantidades[i].group ? totalPorGrupoCantidades[i].group : 'Sin grupo',
                imagen: groupImage,
                stock: totalPorGrupoCantidades[i].totalStock,
                stockDeposito: totalPorGrupoCantidades[i].totalStockDeposito,
                stockTotal: totalPorGrupoCantidades[i].total,
                price: totalPorGrupoCantidades[i].totalPrice.toFixed(2),
                priceBuy: totalPorGrupoCantidades[i].totalPriceBuy.toFixed(2),
                avaible: true,
                categoryNames: '',
                group: totalPorGrupoCantidades[i].group ? totalPorGrupoCantidades[i].group : 'Sin grupo',
            }
            objetoFinal.push(item)
        }
        setGruposJuntos(objetoFinal)
    }

    function handleClick(edit) {
        setGrupoSeleccionado(edit);
    }

    useEffect(() => {
        setGrupoSeleccionado(productoToEdit.group);
    }, [productoToEdit]);

    return (
        <div className=''>
            <div className={cargando ? 'flex flex-col justify-center items-center w-screen h-screen fixed bg-slate-50 z-40 opacity-70' : 'hidden'}>
                <img className='animate-spin mx-auto my-auto w-auto h-[20%] top-[40%] md:h-[40%] fixed md:top-[30%]' src={loadingIcon} alt='loading' />
            </div>

            { }
            <div className={
                (gatilloSumar) ? 'w-screen h-screen fixed bg-slate-50 z-20 opacity-70 ' : 'hidden'
            }>
            </div>

            <div className={
                (gatilloImagen.gatillo) ? 'w-screen h-screen fixed bg-slate-50 z-20 opacity-70 ' : 'hidden'
            }>
            </div>
            <div className={(gatilloImagen.gatillo) ? 'flex justify-center items-center' : 'hidden'}>
                <div className='border-2 z-30 rounded shadow bg-white/30 w-auto h-auto fixed top-[25%] md:top-[15%] '>
                    <button className='font-serif bg-red-600 text-white absolute top-1 right-1 px-1.5 font-black hover:bg-red-300 text-xl' onClick={() => setGatilloImagen({ ...gatilloImagen, gatillo: false })}>X</button>
                    <img className={'p-1 w-auto md:w-auto md:h-auto md:max-h-[70vh] md:max-w-[90vw] h-auto max-h-[45vh]  max-w-[100vw] xl:max-w-screen'} src={gatilloImagen.imagen} alt='product' />
                </div>
            </div>

            <BotonSumar gatilloSumar={gatilloSumar} numeroASumar={numeroASumar} setNumeroASumar={setNumeroASumar} setGatilloSumar={setGatilloSumar} precio={precio} setPrecio={setPrecio} precioCompra={precioCompra} setPrecioCompra={setPrecioCompra} stock={stock} setStock={setStock} stockDeposito={stockDeposito} setStockDeposito={setStockDeposito} />

            <div className={
                (gatilloCambiar) ? 'w-screen h-screen fixed bg-slate-50 z-20 opacity-70 blur-sm' : 'hidden'
            }>
            </div>

            <div className={
                (gatilloEliminar) ? 'w-screen h-screen fixed bg-slate-50 z-20 opacity-70 blur-sm' : 'hidden'
            }>
            </div>
            <EliminarProducto visible={gatilloEliminar} setCargando={setCargando} />

            <div className={
                (gatilloGrupo) ? 'w-screen h-screen fixed bg-slate-50 z-20 opacity-70 blur-sm' : 'hidden'
            } onClick={() => {
                setGrupoSeleccionado(grupoTemporal)
                setGatilloGrupo(false);
            }}>
            </div>
            <CrearGrupo gatilloGrupo={gatilloGrupo} setGatilloGrupo={setGatilloGrupo} grupoTemporal={grupoTemporal} setGrupoTemporal={setGrupoTemporal} grupoSeleccionado={grupoSeleccionado} setGrupoSeleccionado={setGrupoSeleccionado} />

            <div className={
                (gatilloCambiar) ? 'text-4xl rounded-xl w-[60%] xl:w-[30%] md:w-[40%] md:left-[30%] fixed top-[30%] xl:top-[20%] md:top-[10%] left-[20%] xl:left-[35%] z-30' : 'hidden'
            }>
                <div className=' bg-white border shadow text-center rounded-2xl p-1 xl:p-3'>
                    <form className=' flex flex-col' onSubmit={(e) => { e.preventDefault(); sumarRestar(productoToEdit.stockDeposito, productoToEdit.stock, sumarORestar) }}>
                        <button className=' my-1' type='button' onClick={() => setSumarORestar(!sumarORestar)}>
                            <div className='hover:w-[95%] xl:hover:animate-pulse mx-auto w-[90%] flex flex-col justify-center items-center shadow-md border-2 mb-3 p-4 rounded-xl bg-slate-50 text-xl hover:text-2xl font-bold '>
                                <img alt='arrowRight' src={(sumarORestar) ? rightArrow : leftArrow} className=' w-full' />
                            </div>
                        </button>
                        <div className='flex flex-row mx-auto inline items-center justify-center '>
                            <h4 className='font-bold text-blue-700 w-[25%] inline'>{numeroDeposito}</h4>
                            <input className='border-2 rounded w-1/4 text-center' placeholder='0' name='pnumeroBase' value={numeroBase} onChange={(e) => {
                                // estableco el formulario controlado para este input
                                setNumeroBase(e.target.value)
                            }} />
                            <h4 className='font-bold text-indigo-700 w-[25%] inline'>{numeroStock}</h4>
                        </div>
                        <div className='flex flex-row mx-auto mt-5 mb-1 '>
                            <button className='mx-4 m-0 text-lg bg-blue-500 text-white px-3 font-semibold py-0.5 rounded-md  text-md text-2xl xl:text-3xl shadow-sm xl:hover:animate-pulse italic p-10 md:text-3xl mb-2' type='button' onClick={() => { setGatilloCambiar(false); setSumarORestar(true) }}>Cerrar</button>
                            <button className='mx-4 m-0 text-lg bg-blue-500 text-white px-3 font-semibold py-0.5 rounded-md text-md text-2xl xl:text-3xl shadow-sm xl:hover:animate-pulse  italic p-1 md:text-3xl mb-2' type='submit'>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={"hidden xl:flex flex-row bg-cyan-800 items-center justify-between p-1 fixed block w-full top-0 mx-auto ml-0 px-8 z-10 bg-[url(" + bannerMorado2 + ")]  bg-left-top md:bg-top bg-fixed pb-4 shadow-xl rounded-xl shadow rounded-t-none py-3 bg-sky-600 bg-cover bg-center xl:bg-contain md:bg-top bg-fixed"}>
                <BuscarProducto />
                <button onClick={setForm} className='z-10 hover:bg-slate-50 text-xl flex flex-row mb-1 mx-10 xl:ml-10 xl:fixed items-center xl:bottom-[-1%] xl:right-0 xl:mr-0 bg-white border p-3 pr-4 py-2 xl:py-3 shadow rounded-lg hover:animate-pulse items-center justify-center'>
                    <h1 className='mr-3 inline text-black font-bold text-1xl'>Nuevo Producto</h1>
                    <img className='inline rounded text-base xl:text-xl w-8' src={addBtn2} alt='addBtn2' />
                </button>
                <ul className='text-white w-[60%] text-2xl italic flex flex-row justify-end items-center'>
                    <li className='border-l-2 px-2  mr-4 pl-3 pr-2'>
                        <button onClick={
                            () => {
                                window.location.href = ipRuta + '/ventas'
                            }
                        }>Ventas</button>
                    </li>
                    <li className='border-l-2 px-3 pr-2 pb-1 rounded-xl rounded-l-none shadow-xl font-bold text-2xl mr-4 not-italic'>
                        <h1>Inventario</h1>
                    </li>
                    <li className='border-l-2 px-2  mr-4 pl-3 pr-2'>
                        <button onClick={
                            () => {
                                window.location.href = ipRuta + '/historial'
                            }
                        }>Historial</button>
                    </li>
                    <li className='border-l-2 px-2  mr-4 pl-3 pr-2'>
                        <h1>Autor</h1>
                    </li>
                </ul>
            </div>
            <nav className={"flex flex-col xl:flex-row items-center xl:justify-between  py-0 pt-0 xl:pb-[60vh] xl:pt-0  bg-sky-600 bg-[length:auto_100vh] md:bg-[length:auto_100vh] xl:bg-[length:100vw_auto] bg-[position:center_-40vh] md:bg-[position:center_0vh] xl:bg-center-top xl:bg-contain md:bg-top bg-fixed xl:px-8 shadow-md md:rounded-xl md:rounded-t-none xl:bg-[url(" + bannerMorado + ")] bg-[url(" + bannerMorado3 + ")]"}>
                <div className={`flex flex-col justify-center items-center ` + (gatilloOpciones ? "" : "")}>
                    <OpcionesMobile gatilloOpciones={gatilloOpciones} setGatilloOpciones={setGatilloOpciones} />
                    <button className='xl:hidden py-4 inline w-[8%] xl:w-[3.5%] ' onClick={() => setGatilloOpciones(!gatilloOpciones)}>
                        <img src={boton3bars} alt='3 bars btn' className='w-[100%]' />
                    </button>
                </div>
                <button onClick={setForm} className='xl:hidden xl:z-10 hover:bg-slate-50 text-xl flex flex-row  mx-10 xl:ml-10 xl:fixed items-center xl:bottom-[-1%] xl:right-0 xl:mr-0 bg-white border p-3 pr-4 py-2 xl:py-3 shadow rounded-lg hover:animate-pulse items-center justify-center'>
                    <h1 className='mr-3 inline text-black font-bold text-1xl'>Nuevo Producto</h1>
                    <img className='inline rounded text-base xl:text-xl w-8' src={addBtn2} alt='addBtn2' />
                </button>
                <div className='xl:hidden py-4'>
                    <BuscarProducto />
                </div>
            </nav>

            <CrearProducto visible={mostrarForm} cargando={cargando} setCargando={setCargando} gatilloGrupo={gatilloGrupo} setGatilloGrupo={setGatilloGrupo} grupoTemporal={grupoTemporal} setGrupoTemporal={setGrupoTemporal} grupoSeleccionado={grupoSeleccionado} setGrupoSeleccionado={setGrupoSeleccionado} />
            <CambiarProducto visible={mostrarEdit} setGatilloSumar={setGatilloSumar} gatilloSumar={gatilloSumar} setNumeroASumar={setNumeroASumar} precio={precio} setPrecio={setPrecio} precioCompra={precioCompra} setPrecioCompra={setPrecioCompra} stock={stock} setStock={setStock} stockDeposito={stockDeposito} setStockDeposito={setStockDeposito} cargando={cargando} setCargando={setCargando} gatilloGrupo={gatilloGrupo} setGatilloGrupo={setGatilloGrupo} grupoTemporal={grupoTemporal} setGrupoTemporal={setGrupoTemporal} grupoSeleccionado={grupoSeleccionado} setGrupoSeleccionado={setGrupoSeleccionado} />

            <Paginado />
            {(input1.length && !productosFiltrados.length) ? <h1 className='text-center text-xl xl:text-2xl font-serif bg-red-600 mx-3 xl:mx-[10vw] text-white font-bold py-[2.5vh] mx-[5vw] px-4 md:mx-[10vw] xl:py-4 mt-[2.5vh] xl:my-[5vh] mb-[5vh] xl:my-6 rounded'>No hay productos que coincidan con tu busqueda</h1> : null}
            <div className='w-screen overflow-x-auto'>

                <ul className='font-serif flex flex-col items-center justify-center text-center my-6 mt-0 flex justify-around overflow-x-auto w-[100%] md:w-[100%] xl:w-[95%] xl:w-screen mx-auto text-xs md:text-sm xl:text-xl md:px-3 xl:pr-9  '>
                    <li className='hidden font-serif md:flex flex-row my-3 font-bold flex w-full shadow pb-3'>
                        <h2 className='font-serif flex-grow min-w-0 basis-[6.25%]'>Img</h2>
                        <div className='font-serif flex-grow min-w-0 basis-[6.25%] flex flew-row items-center '>
                            {/* boton con una imagen dada */}
                            <button onClick={() => ordenarCodigo(productos, productosFiltrados, activo)} className='flex flex-row items-center xl:hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic mx-auto'>
                                <img className='hidden md:w-6 md:h-6 ' src={flechaImagen} alt='flecha' />
                                <h2>#</h2>
                            </button>
                        </div>
                        <div className='font-serif flex-grow min-w-0 basis-[18.75%] flex flew-row items-center'>
                            {/* boton con una imagen dada */}
                            <button onClick={ordenNombre} className='flex flex-row items-center xl:hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic mx-auto'>
                                <img className='hidden md:w-6 md:h-6 ' src={flechaImagen} alt='flecha' />
                                <h2>Nombre</h2>
                            </button>
                        </div>

                        <div className='font-serif flex-grow min-w-0 basis-[12.5%] flex flew-row items-center '>
                            {/* boton con una imagen dada */}
                            <button onClick={() => ordenarDeposito(productos, productosFiltrados, activo)} className='flex flex-row items-center xl:hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic mx-auto'>
                                <img className='hidden md:w-6 md:h-6 ' src={flechaImagen} alt='flecha' />
                                <h2>Deposito</h2>
                            </button>
                        </div>

                        <div className='font-serif flex-grow min-w-0 basis-[12.5%] flex flew-row items-center '>
                            {/* boton con una imagen dada */}
                            <button onClick={ordenStock} className='flex flex-row items-center xl:hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic mx-auto'>
                                <img className='hidden md:w-6 md:h-6 ' src={flechaImagen} alt='flecha' />
                                <h2>Tienda</h2>
                            </button>
                        </div>

                        <div className='font-serif flex-grow min-w-0 basis-[12.5%] flex flew-row items-center '>
                            {/* boton con una imagen dada */}
                            <button onClick={() => ordenarTotal(productos, productosFiltrados, activo)} className='flex flex-row items-center xl:hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic mx-auto'>
                                <img className='hidden md:w-6 md:h-6 ' src={flechaImagen} alt='flecha' />
                                <h2>Total</h2>
                            </button>
                        </div>

                        <div className='font-serif flex-grow min-w-0 basis-[12.5%] flex flew-row items-center'>
                            {/* boton con una imagen dada */}
                            <button onClick={() => ordenarPrecio(productos, productosFiltrados, activo)} className='flex flex-row items-center justify-center hover:xl:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic mx-auto'>
                                <img className='hidden md:w-6 md:h-6 ' src={flechaImagen} alt='flecha' />
                                <h2>Precio</h2>
                            </button>
                        </div>

                        <div className='font-serif flex-grow min-w-0 basis-[12.5%] flex flew-row items-center  '>
                            {/* boton con una imagen dada */}
                            <button onClick={() => ordenarPrecioCompra(productos, productosFiltrados, activo)} className='flex flex-row items-center justify-center xl:hover:animate-pulse hover:shadow hover:border hover:rounded-lg hover:p-2 hover:italic mx-auto'>
                                <img className='hidden md:w-6 md:h-6 ' src={flechaImagen} alt='flecha' />
                                <h2 className=''>Costo</h2>
                            </button>
                        </div>
                        <h2 className='font-serif flex-grow min-w-0 basis-[6.25%]'> </h2>
                    </li>

                    {(!(productosFiltrados.length ? productosFiltrados : productos).slice((pagina * cantidadPagina) - cantidadPagina, (pagina * cantidadPagina)).length > 0) ?
                        <li className='w-full flex flex-col items-center justify-center xl:mt-6 italic'>
                            <h1 className='font-serif text-2xl xl:text-4xl mx-auto font-bold font-serif block mt-0'>No hay productos disponibles</h1>
                            <img className="w-3/4 xl:w-1/2 bottom-1" src="https://chryslergroup.navigation.com/static/WFS/Shop-Site/-/Shop/en_US/Product%20Not%20Found.png" alt="notFound" />
                        </li>


                        : (!activarGrupos ? (productosFiltrados.length ? productosFiltrados : productos) : gruposJuntos).slice((pagina * cantidadPagina) - cantidadPagina, (pagina * cantidadPagina)).map(el => {
                            // permitir que mi elemento li se expanda a lo anchos de la pantalla
                            return <li className='border-4 border-x-0 md:border-4 shadow-2xl rounded font-serif flex flex-row py-2 md:py-0 odd:bg-white even:bg-slate-100 last:border-b-4 border-b-0 w-full relative font-bold text-[0.68rem] md:text-base xl:text-2xl h-[12.5vh] md:h-[25vh] xl:h-[20vh]'>
                                <div className='xl:ml-2 flex-grow min-w-0 md:basis-[6.25%] w-full h-full basis-[25%] my-auto '>
                                    <button className=' w-full h-full' onClick={() => { setGatilloImagen({ gatillo: true, imagen: el.imagen }) }}>
                                        <img className='max-w-[85%] max-h-[85%] m-auto' src={el.imagen} alt="Product" />
                                    </button>
                                </div>

                                <h3 className='hidden md:flex justify-center items-center flex-grow min-w-0 md:basis-[6.25%] basis-[0%]  static italic text-sm xl:text-2xl'>{'#' + el.id}</h3>

                                <div className='md:min-w-0 md:basis-[81.25%] md:flex md:flex-row flex items-center justify-center flex-col basis-[60%]'>
                                    <h3 className='flex-grow min-w-0 md:basis-[23.076%] break-normal static text-base xl:text-xl md:mb-0 mb-1 px-4 md:text-sm text-center flex justify-center items-center'>{el.name}</h3>

                                    <div className='md:min-w-0 md:basis-[76.923%] w-[80%] md:flex md:flex-row md:items-center md:justify-center text-left md:text-center'>
                                        <div className='flex flex-row flex-grow md:basis-[40%] relative justify-between md:justify-center items-center '>
                                            <div className='flex-grow min-w-0 basis-[50%] flex flex-row items-center md:justify-center justify-start'>
                                                <h3 className='md:hidden mr-1'>Deposito:</h3>
                                                <h3>{el.stockDeposito}</h3>
                                            </div>

                                            <button className=" hidden xl:mx-0 md:flex flex-col items-center justify-center absolute w-[12%] xl:w-[10%] md:w-[12%] left-[44%] xl:left-[45%] md:left-[45%] xl:hover:animate-pulse hover:w-[15%] md:hover:w-[12%]" onClick={() => { cambiarStock(el.id, productos); setGatilloCambiar(true); setNumeroBase(Number('')) }}>
                                                <img src={transferBtn} alt='transferArrow' className='hidden md:flex w-[100%] h-[100%]' />
                                                <img src={editBtn} alt='pencil' className='hidden xl:flex xl:mt-1 w-4 h-4' />
                                            </button>

                                            <div className='flex-grow min-w-0 basis-[50%]  flex flex-row items-center md:justify-center justify-end'>
                                                <h3 className='md:hidden mr-1'>Tienda:</h3>
                                                <h3>{el.stock}</h3>
                                            </div>
                                        </div>
                                        <h3 className='md:text-center hidden md:flex md:items-center md:justify-center flex-grow min-w-0 md:basis-[20%]  font-bold'>{Number(el.stock) + Number(el.stockDeposito)}</h3>
                                        <div className='md:min-w-0 md:basis-[40%] flex flex-row items-center justify-between md:justify-center'>
                                            <div className='flex-grow md:min-w-0 md:basis-[50%]  font-bold flex flex-row items-center justify-start md:justify-center'>
                                                <p className='md:hidden md:mr-0 mr-1'>Precio: </p>
                                                <h3 className=''> {'$' + el.price}</h3>
                                            </div>
                                            <div className='flex-grow md:min-w-0 md:basis-[50%]  font-bold flex flex-row items-center justify-end md:justify-center'>
                                                <p className='md:hidden md:mr-0 mr-1'>Costo: </p>
                                                <h3 className=''> {'$' + el.priceBuy}</h3>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className={'flex-grow min-w-0 md:basis-[6.25%] basis-[15%]  flex flex-col items-center justify-center'}>
                                    {/* <button className="xl:hover:animate-pulse font-bold rounded block  flex flex-row items-center justify-center text-sm xl:text-base md:text-sm md:hover:text-base hover:shadow hover:border hover:rounded-lg hover:p-2 xl:hover:text-xl flex flex-col justify-center items-center md:mr-2" onClick={() => {
                                        if (!activarGrupos) {
                                            handleClick(productoToEdit.group)
                                            setEdit(el.id, productos)
                                        }
                                    }
                                    }>
                                        <h4>Editar</h4>
                                        <img src={editBtn} alt='pencil' className='w-6 h-6 xl:w-8 xl:h-8 hover:w-9 hover:h-9' />
                                    </button> */}

                                    <button onClick={() => {
                                        if (!activarGrupos) {
                                            handleClick(productoToEdit.group)
                                            setEdit(el.id, productos)
                                        }
                                    }
                                    } class="flex p-2.5 bg-slate-700 rounded-xl hover:rounded-3xl hover:bg-slate-500 transition-all duration-300 text-white " >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>


                                    {/* <button onClick={() => {
                                        if (!activarGrupos) {
                                            handleClick(productoToEdit.group)
                                            setEdit(el.id, productos)
                                        }
                                    }
                                    } class="mx-auto flex gap-10">
                                        <div class="w-auto h-auto">
                                            <div class="flex-1 h-full">
                                                <div class="flex items-center justify-center flex-1 h-full p-2 border border-gray-400 rounded-lg">
                                                    <div class="relative">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </button> */}
                                </div>
                            </li>
                        })}
                </ul>
            </div>

            <div className='flex justify-center items-center my-6 mt-2 text-center'>
                <button type='button'
                    className='flex break-inside  rounded-3xl px-6 py-4 mb-4 w-auto bg-slate-700 font-bold text-white' onClick={mostrarGrupos}>
                    <div class='flex items-center justify-between flex-1'>
                        <span class='text-lg font-medium text-white mr-4'>Ordenar por grupo</span>
                        <svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path fillRule='evenodd' clipRule='evenodd'
                                d='M0 8.71423C0 8.47852 0.094421 8.25246 0.262491 8.08578C0.430562 7.91911 0.658514 7.82547 0.896201 7.82547H13.9388L8.29808 2.23337C8.12979 2.06648 8.03525 1.84013 8.03525 1.60412C8.03525 1.36811 8.12979 1.14176 8.29808 0.974875C8.46636 0.807989 8.6946 0.714233 8.93259 0.714233C9.17057 0.714233 9.39882 0.807989 9.5671 0.974875L16.7367 8.08499C16.8202 8.16755 16.8864 8.26562 16.9316 8.3736C16.9767 8.48158 17 8.59733 17 8.71423C17 8.83114 16.9767 8.94689 16.9316 9.05487C16.8864 9.16284 16.8202 9.26092 16.7367 9.34348L9.5671 16.4536C9.39882 16.6205 9.17057 16.7142 8.93259 16.7142C8.6946 16.7142 8.46636 16.6205 8.29808 16.4536C8.12979 16.2867 8.03525 16.0604 8.03525 15.8243C8.03525 15.5883 8.12979 15.362 8.29808 15.1951L13.9388 9.603H0.896201C0.658514 9.603 0.430562 9.50936 0.262491 9.34268C0.094421 9.17601 0 8.94995 0 8.71423Z'
                                fill='white' />
                        </svg>
                    </div>
                </button>
            </div>

            <Paginado />

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
        // traigo pagina del estado
        pagina: state.pagina,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setForm: () => dispatch(setForm()),
        setProductos: (input, orden) => dispatch(setProductos(input, orden)),
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
        cambiarPagina: (pagina) => dispatch(cambiarPagina(pagina)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);