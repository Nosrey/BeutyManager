import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { setEdit, setProductos, cambiarGatilloEliminar, activarSumar } from '../../actions/index'
import { connect } from "react-redux";
import './cambiarProducto.css'
// importo ip de Home.jsx
import { ip, addBtn2, removeBtn } from '../home/Home.jsx'

let ready = true;
let arranque = false;

let textPrimeraVez = ''
function CambiarProducto({ setEdit, visible, setProductos, productos, productoToEdit, cambiarGatilloEliminar, activarSumar, sumar, setGatilloSumar, setNumeroASumar, precio, setPrecio, stock, setStock, precioCompra, setPrecioCompra, stockDeposito, setStockDeposito }) {

    if (visible) { arranque = true; }

    const paleta = ["text-fuchsia-400", "text-purple-500", "text-violet-500", "text-indigo-500", "text-blue-500", "text-sky-500", "text-cyan-500", "text-teal-500"]

    const bordes = ["border-fuchsia-400", "border-purple-500", "border-violet-500", "border-indigo-500", "border-blue-500", "border-sky-500", "border-cyan-500", "border-teal-500"]

    const imagenNotFound = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-4.png'

    const [image, setImage] = useState(imagenNotFound)
    const [pcategory, setPcategory] = useState('')
    // declaro el estado primeraVez en true
    const [primeraVez, setPrimeraVez] = useState(true)

    // declaro constantes para estados para hacer mis input type number en formularios controlados


    if (primeraVez) {
        textPrimeraVez = productoToEdit.categoryNames;
    }

    function comas(valorArray) {
        if (valorArray) {

            valorArray = valorArray.split('')
            for (let i = 0; i < valorArray.length; i++) {  // para quitar espacio post comas
                if (valorArray[i + 1] === ' ' && valorArray[i] === ',') {
                    valorArray.splice(i + 1, 1)
                    i = 0;
                }
            }
            return valorArray.join('')
        } else return ''
    }

    function handlePcategory(e) {
        setPrimeraVez(false)
        setPcategory(e.target.value)
    }

    function cerrar(e) {
        e.preventDefault();
        textPrimeraVez = ''
        setPrimeraVez(true);
        setEdit(productoToEdit.id, productos)
        var { pname  } = document.forms[2];
        pname.value = '';
        setStock( parseInt("") );
        setPrecio( parseInt("") );
        // hago lo mismo con setPrecioCompra y setStockDeposito
        setPrecioCompra( parseInt("") );
        setStockDeposito( parseInt("") );
        setPcategory('')
        setImage(imagenNotFound)
    }

    // funcion para eliminar acentos de una palabra dada
    function eliminarAcentos(palabra) {
        let palabraSinAcentos = palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return palabraSinAcentos
    }

    function handleFileChange(e) {
        let file = e.target.files[0]

        const data = new FormData();
        data.append('file', file)
        data.append('upload_preset', 'ejemplo')
        data.append('cloud_name', 'dyg5hutpb')
        fetch('https://api.cloudinary.com/v1_1/dyg5hutpb/image/upload',
            {
                method: 'post',
                body: data
            })
            .then(resp => resp.json())
            .then(data => {
                setImage(data.secure_url)
            })
            .catch(err => console.log('hubo un error: ', err.response.data))

    }

    // declaro un useEffect para que cuando productoToEdit cambie se actualicen los valores de mis estados stock y stockDeposito
    useEffect(() => {
        setStock(productoToEdit.stock)
        setStockDeposito(productoToEdit.stockDeposito)
        // eslint-disable-next-line
    }, [productoToEdit, visible])


    const handleSubmit = async (e) => {
        //Prevent page reload
        e.preventDefault();

        if (ready) {
            ready = false;

            var { pname, pstock, pstockDeposito, pprice, ppriceBuy, pcategory } = document.forms[2];


            if (pprice.value.length) {
                if (!isNaN(pprice.value)) {
                    let letra = pprice.value.toString().split('');
                    for (let i = 0; i < letra.length; i++) {
                        if (letra[0] === '.' || letra[0] === ',') {
                            if (letra[0] === ',') letra[0] = '.'
                            letra.unshift('0')
                            i = 0;
                        }
                        else if (letra[i] === ',') letra[i] = '.';
                    }
                    pprice.value = Number(letra.join(''))
                } else {
                    pprice.value = '';
                    alert('El precio ingresado debe ser un numero, tu valor sera ignorado')
                }
            }

            if (ppriceBuy.value.length) {
                if (!isNaN(ppriceBuy.value)) {
                    let letra = ppriceBuy.value.toString().split('');
                    for (let i = 0; i < letra.length; i++) {
                        if (letra[0] === '.' || letra[0] === ',') {
                            if (letra[0] === ',') letra[0] = '.'
                            letra.unshift('0')
                            i = 0;
                        }
                        else if (letra[i] === ',') letra[i] = '.';
                    }
                    ppriceBuy.value = Number(letra.join(''))
                } else {
                    ppriceBuy.value = '';
                    alert('El precio ingresado debe ser un numero, tu valor sera ignorado')
                }
            }

            if (pstock.value.length) {
                if (!isNaN(pstock.value)) {
                    let letra = pstock.value.toString().split('');
                    for (let i = 0; i < letra.length; i++) {
                        if (letra[i] === '.' || letra[i] === ',') pstock.value = ''
                    }
                    if (!pstock.value.length) {
                        pstock.value = '';
                        alert('Debes introducir un numero entero en la cantidad de stock en deposito, tu valor sera ignorado')
                    }
                } else {
                    pstock.value = '';
                    alert('La cantidad ingresada debe ser un numero, tu valor sera ignorado')
                }
            }

            if (pstockDeposito.value.length) {
                if (!isNaN(pstockDeposito.value)) {
                    let letra = pstockDeposito.value.toString().split('');
                    for (let i = 0; i < letra.length; i++) {
                        if (letra[i] === '.' || letra[i] === ',') pstockDeposito.value = ''
                    }
                    if (!pstockDeposito.value.length) {
                        pstockDeposito.value = '';
                        alert('Debes introducir un numero entero en la cantidad de stock en tienda, tu valor sera ignorado')
                    }
                } else {
                    pstockDeposito.value = '';
                    alert('La cantidad ingresada debe ser un numero, tu valor sera ignorado')
                }
            }

            let productData = {}

            for (let i = 0; i < productos.length; i++) {
                if (productos[i].id === productoToEdit.id) productData = productos[i]
            }

            if (pname.value) {
                let nombre = eliminarAcentos(pname.value);
                productData.name = nombre;
            }
            if (pstock.value) productData.stock = pstock.value
            if (pstockDeposito.value) productData.stockDeposito = pstockDeposito.value
            if (pprice.value) productData.price = pprice.value
            if (ppriceBuy.value) productData.priceBuy = ppriceBuy.value
            if (pcategory.value) productData.categoryNames = pcategory.value

            if (image && image !== imagenNotFound) productData.imagen = image

            Axios.put(ip + '/products/' + productoToEdit.id, productData)
                .then((el) => alert('fue editado correctamente: ', el))
                .then(() => setEdit((productoToEdit.id || 0), productos))
                .then(() => {
                    pname.value = '';
                    pstock.value = '';
                    pstockDeposito.value = '';
                    pprice.value = '';
                    ppriceBuy.value = '';
                    setStock( parseInt("") );
                    setPrecio( parseInt("") );
                    // hago lo mismo con setPrecioCompra y setStockDeposito
                    setPrecioCompra( parseInt("") );
                    setStockDeposito( parseInt("") );
                    setPcategory('')
                    setImage(imagenNotFound)
                    setPrimeraVez(true)
                })
                .then(() => ready = true)

                .catch((err) => {
                    console.log('error en cambiar producto: ', err.response.data);
                    ready = true;
                })
        };

    }


    function primeraMayuscula(palabra) {
        if (palabra) {
            let palabrita = palabra.toLowerCase().split('');
            palabrita[0] = palabrita[0].toUpperCase();
            return '"' + palabrita.join('') + '"'
        }
    }

    function colores(i) {
        if (i > 7) i = getRndInteger(0, 8)
        let color = paleta[(i - 7) * -1]
        return color + ' inline m-1 border-2 ' + bordes[(i - 7) * -1] + ' px-1 py-0.5'
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // funcion llamada eliminarProducto que envia a una direccion de la api tipo .delete el id del producto a eliminar
    function eliminarProducto(id) {
        if (ready) {
            ready = false;
            cambiarGatilloEliminar()
            let { pname, pstock, pstockDeposito, pprice, ppriceBuy } = document.forms[2];

            pname.value = '';
            pstock.value = '';
            pstockDeposito.value = '';
            pprice.value = '';
            ppriceBuy.value = '';
            setPcategory('')
            setImage(imagenNotFound)
            ready = true
            setEdit(productoToEdit.id, productos)
        }
    }

    // declaro sumBtn
    function sumBtn(id, signo) {
        setGatilloSumar(true)
        if (id === 'stockDepositoBtn') setNumeroASumar({ name: 'stockDeposito', value: stockDeposito, signo: signo })
        // agregar un else if para las otras id's posibles que son stockBtn, priceBtn y priceBuyBtn
        // y en cada uno de ellos setear el numero a sumar con el valor que corresponda
        else if (id === 'stockBtn') setNumeroASumar({ name: 'stock', value: stock, signo: signo })
        else if (id === 'priceBtn') setNumeroASumar({ name: 'price', value: precio, signo: signo })
        else if (id === 'priceBuyBtn') setNumeroASumar({ name: 'priceBuy', value: precioCompra, signo: signo })
    }

    return (
        <div className={
            "z-10 right-[0%] fixed bg-white w-96 h-screen border-2 rounded-md border-l-0 hover:border-sky-200 overflow-auto  p-4 pt-1 top-0 "
            // max-h-screen
            + (arranque ? (visible ? "potb" : "pot2b") : 'fuera')
        }
        >
            <button className='font-serif bg-red-600 text-white absolute top-2 right-3 px-1.5 font-black hover:bg-red-300 text-xl' onClick={cerrar}>X</button>
            <div className="font-serif ">
                <form onSubmit={handleSubmit} autoComplete="off" className='font-serif flex flex-col items-center justify-center w-[80%] mx-auto'>
                    <div className="font-serif input-container mt-4 w-[100%] mb-6">
                        <label className="font-serif text-xl font-semibold text-center mb-1">Nombre del producto</label>
                        <input type="text" name="pname" placeholder={productoToEdit.name} className="font-serif   block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl " />
                    </div>
                    <div className="font-serif input-container w-[100%] mb-6">
                        <label className="font-serif text-xl font-semibold text-center mb-1">Cantidad en Deposito</label>
                        <div className='flex flex-row w-auto items-center justify-center'>
                            <button className='w-[20%] mr-3' type='button' onClick={() => sumBtn('stockDepositoBtn', "-")}>
                                <img src={removeBtn} alt='removeBtn' />
                            </button>
                            <input type="number" step="1" name="pstockDeposito" value={stockDeposito} onChange={(e) => { setStockDeposito(e.target.value) }} placeholder={productoToEdit.stockDeposito} className="font-serif   block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl " />
                            <button id='stockDepositoBtn' className='w-[20%] ml-3' type='button' onClick={() => sumBtn("stockDepositoBtn", "+")}>
                                <img src={addBtn2} alt='addItems' />
                            </button>
                        </div>
                    </div>
                    <div className="font-serif input-container w-[100%] mb-6">
                        <label className="font-serif text-xl font-semibold text-center mb-1">Cantidad en Tienda</label>
                        <div className='flex flex-row w-auto items-center justify-center'>
                            <button className='w-[20%] mr-3' type='button' onClick={() => sumBtn('stockBtn', "-")}>
                                <img src={removeBtn} alt='removeBtn' />
                            </button>
                            <input type="number" step="1" name="pstock" value={stock} onChange={(e) => { setStock(e.target.value) }} placeholder={productoToEdit.stock} className="font-serif   block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl" />
                            <button className='w-[20%] ml-3' type='button' onClick={() => sumBtn('stockBtn', "+")}>
                                <img src={addBtn2} alt='addItems' />
                            </button>
                        </div>
                    </div>
                    <div className="font-serif input-container w-[100%] mb-6">
                        <label className="font-serif text-xl font-semibold text-center mb-1">Precio de venta</label>
                        <div className='flex flex-row w-auto items-center justify-center'>
                            <input type="number" step="0.01" name="pprice" value={precio} onChange={(e) => { setPrecio(e.target.value) }} placeholder={productoToEdit.price} className="font-serif   block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl" />
                     
                        </div>
                    </div>
                    <div className="font-serif input-container w-[100%] mb-6">
                        <label className="font-serif text-xl font-semibold text-center mb-1">Precio de compra</label>
                        <div className='flex flex-row w-auto items-center justify-center'>
                            <input type="number" step="0.01" name="ppriceBuy" value={precioCompra} onChange={(e) => { setPrecioCompra(e.target.value) }} placeholder={productoToEdit.priceBuy} className="font-serif   block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl" />
                       
                        </div>
                    </div>
                    <div className="font-serif input-container text-center w-[100%] mb-6">
                        <h2 className="font-serif text-xl font-semibold text-center mb-1">Categorias del producto</h2>
                        <input type="text" value={primeraVez ? productoToEdit.categoryNames : pcategory} onChange={handlePcategory} name="pcategory" placeholder={productoToEdit.categoryNames} className="font-serif   block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl mb-0" />

                        <ul className='font-serif flex flex-wrap justify-center my-3 mb-3  '>
                            {
                                (primeraVez ?
                                    (comas(textPrimeraVez).split(',')[0] !== '') ? (
                                        comas(textPrimeraVez).split(',').map((el, i) => {
                                            return (
                                                <li className={colores(i)}>{primeraMayuscula(el)}</li>
                                            )
                                        })

                                    ) : ''


                                    : (comas(pcategory).split(',')[0] !== '') ? (
                                        comas(pcategory).split(',').map((el, i) => {
                                            return (
                                                <li className={colores(i)}>{primeraMayuscula(el)}</li>
                                            )
                                        })

                                    ) : '')
                            }

                        </ul>
                    </div>

                    <label class="block">
                        <span class="sr-only">Subir imagen</span>
                        <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleFileChange} class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-200 ml-2" />
                    </label>

                    <img src={(image !== imagenNotFound) ? image : (productoToEdit.imagen) ? productoToEdit.imagen : image} alt='product' className='font-serif w-28 inline py-4 mb-4' />

                    <button type='button' onClick={() => eliminarProducto()} className='font-serif bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xl my-5 mb-6'>Eliminar Producto</button>

                    <button type='submit' className='font-serif bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded text-xl mb-20'>Actualizar Producto</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productos: state.productos,
        productoToEdit: state.productoToEdit,
        categorias: state.categorias,
        // implemento el estado sumar
        sumar: state.sumar,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setEdit: (id, productoLista) => dispatch(setEdit(id, productoLista)),
        setProductos: () => dispatch(setProductos()),
        // implemento cambiarGatilloEliminar
        cambiarGatilloEliminar: () => dispatch(cambiarGatilloEliminar()),
        // implemento activarSumar
        activarSumar: () => dispatch(activarSumar()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CambiarProducto);