import React, { useState } from 'react';
import Axios from 'axios';
import { setForm, setProductos, filtrarProductos, setEdit } from '../../actions/index'
import { connect } from "react-redux";
import './crearProducto.css'

// importo ip de Home.jsx
import { ip } from '../home/Home.jsx'


let ready = true;
let arranque = false;

function CrearProducto({ productoToEdit, setEdit, setForm, visible, setProductos, productos, filtrarProductos, categorias, cargando, setCargando, input1 }) {

    if (visible) { arranque = true; }

    const imagenNotFound = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-4.png'
    const paleta = ["text-fuchsia-400", "text-purple-500", "text-violet-500", "text-indigo-500", "text-blue-500", "text-sky-500", "text-cyan-500", "text-teal-500"]

    const bordes = ["border-fuchsia-400", "border-purple-500", "border-violet-500", "border-indigo-500", "border-blue-500", "border-sky-500", "border-cyan-500", "border-teal-500"]

    const [image, setImage] = useState(imagenNotFound)
    const [pcategory, setPcategory] = useState('')

    function cerrar(e) {
        e.preventDefault();
        setForm()
    }

    function primeraMayuscula(palabra) {
        if (palabra) {
            let palabrita = palabra.toLowerCase().split('');
            palabrita[0] = palabrita[0].toUpperCase();
            return '"' + palabrita.join('') + '"'
        }
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function colores(i) {
        if (i > 7) i = getRndInteger(0, 8)
        let color = paleta[(i - 7) * -1]
        return color + ' inline m-1 border-2 ' + bordes[(i - 7) * -1] + ' px-1 py-0.5'
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

    function handlePcategory(e) {
        // creo un formulario controlado por estado para el input de pcategory
        setPcategory(e.target.value)
    }

    // funcion para eliminar acentos de una palabra dada
    function eliminarAcentos(palabra) {
        let palabraSinAcentos = palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return palabraSinAcentos
    }

    const handleSubmit = (e) => {
        setCargando(true)
        e.preventDefault();
        //Prevent page reload

        if (ready) {
            ready = false;

            var { pname, pstock, pstockDeposito, pprice, ppriceBuy, pcategory } = document.forms[1];

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
                    alert('El precio de venta ingresado debe ser un numero, tu valor sera ignorado')
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
                    alert('El precio de compra ingresado debe ser un numero, tu valor sera ignorado')
                }
            }

            if (pstock.value.length) {
                if (isNaN(pstock.value)) {
                    pstock.value = '';
                }
                let letra = pstock.value.toString().split('');
                for (let i = 0; i < letra.length; i++) {
                    if (letra[i] === '.' || letra[i] === ',') pstock.value = ''
                }
                if (!pstock.value.length) {
                    pstock.value = '';
                    alert('Debes introducir un numero entero en la cantidad de stock en deposito del producto, tu valor sera ignorado')
                }
            }
            else {
                pstock.value = 0
            }

            if (pstockDeposito.value.length) {
                if (isNaN(pstockDeposito.value)) {
                    pstockDeposito.value = '';
                }
                let letra = pstockDeposito.value.toString().split('');
                for (let i = 0; i < letra.length; i++) {
                    if (letra[i] === '.' || letra[i] === ',') pstockDeposito.value = ''
                }
                if (!pstockDeposito.value.length) {
                    pstockDeposito.value = '';
                    alert('Debes introducir un numero entero en la cantidad de stock en tienda del producto, tu valor sera ignorado')
                }
            }
            else {
                pstockDeposito.value = 0
            }

            if (pname.value) {
                let nombre = pname.value;
                let existencia = productos.filter((el) => el.name.toLowerCase() === nombre.toLowerCase())
                console.log('hola soy existencia: ', existencia.length)
                if (existencia.length) {
                    alert('El producto ingresado ya existe, por favor ingresa uno diferente')
                    pname.value = '';
                }
            }

            if (pname.value && pstock.value && pstockDeposito.value && pprice.value && ppriceBuy.value) {
                let salir = 0; // para disparar la salida
                // eslint-disable-next-line
                productos.map(el => {
                    if (el.name === pname.value) return salir = 1
                })
                if (salir > 0) return alert("Este producto ya existe, no puede ser agregado")
                
                if (pcategory.value) {
                    pcategory.value = comas(pcategory.value)
                }

                let nombre
                if (pname.value) nombre = eliminarAcentos(pname.value)
                const productData = { name: nombre, imagen: image, stock: pstock.value, stockDeposito: pstockDeposito.value, price: pprice.value, priceBuy: ppriceBuy.value, avaible: true, categoryNames: pcategory.value }
                console.log('Soy el producto que enviaras: ', productData)
                Axios.post(ip + '/products', productData)
                    .then(() => setForm()) // para mostrar el formulario
                    .then(() => setProductos(input1)) // para pedir los productos actualizados
                    .then(() => console.log('soy la lista de productos: ', productos))
                    .then(() => {  // vaciamos el formulario
                        pname.value = '';
                        pstock.value = '';
                        pstockDeposito.value = '';
                        pprice.value = '';
                        ppriceBuy.value = '';
                        setPcategory('');
                        setImage(imagenNotFound);
                    })
                    .then(() => {
                        filtrarProductos(productos, '') // actualizamos el filtro al crear un nuevo producto
                    })
                    .then(() =>{ 
                        ready = true;
                        setCargando(false)
                    })

                    .catch((err) => {
                        console.log('ocurrio un error: ', err)
                        ready = true;
                        setCargando(false)
                    })
            } else {
                // Username not found
                if (!pname) alert('Debes agregar un nombre')
                if (!pstock) alert('debes agregar la cantidad de para el deposito')
                if (!pstockDeposito) alert('debes agregar la cantidad para la tienda')
                if (!pprice) alert('debes agregar el precio')
                ready = true
            }
        };
    }


    function handleFileChange(e) {
        setCargando(true)
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
                setCargando(false);
            })
            .catch(err => {
                console.log('hubo un error: ', err);
                setCargando(false)
            })

    }

    return (
        <div className={
            "z-10 left-[0%] fixed bg-white w-full xl:w-96 h-screen border-2 rounded-md border-l-0 hover:border-sky-200 overflow-auto  p-4 pt-1 top-0 "
            // max-h-screen
            + (arranque ? (visible ? "pot" : "pot2") : 'fuera2')
        }
        >
            <button className='font-serif bg-red-600 text-white absolute top-2 right-3 px-1.5 font-black hover:bg-red-300 text-xl' onClick={cerrar}>X</button>
            <div className="font-serif ">
                <form onSubmit={handleSubmit} autoComplete="off" className='font-serif flex flex-col items-center justify-center w-[80%] mx-auto'>
                    <div className="font-serif input-container mt-4 w-[100%] mb-6">
                        <label className="font-serif text-xl font-semibold text-center">Nombre del Producto</label>
                        <input type="text" name="pname" placeholder='Nombre...' className="font-serif   block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl" required />

                    </div>
                    <div className="font-serif input-container w-[100%] mb-6">
                        <label className="font-serif text-xl font-semibold text-center">Cantidad en Deposito</label>
                        <input type="number" step="1" name="pstock" placeholder='Cantidad en deposito...' className="font-serif   block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl" required />
                    </div>
                    <div className="font-serif input-container w-[100%] mb-6">
                        <label className="font-serif text-xl font-semibold text-center">Cantidad en Tienda</label>
                        <input type="number" step="1" name="pstockDeposito" placeholder='Cantidad en tienda...' className="font-serif   block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl" required />
                    </div>
                    <div className="font-serif input-container w-[100%] mb-6">
                        <label className="font-serif text-xl font-semibold text-center">Precio de Venta</label>
                        <input id="price" type="number" step="0.01" name="pprice" placeholder="Precio de venta..." className="font-serif   block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl" required />

                    </div>

                    <div className="font-serif input-container w-[100%] mb-6">
                        <label className="font-serif text-xl font-semibold text-center">Precio de Compra</label>
                        <input id="priceBuy" type="number" step="0.01" name="ppriceBuy" placeholder="Precio de compra..." className="font-serif   block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl" required />

                    </div>
                    <div className="font-serif input-container flex flex-col items-center w-[100%] mb-3">
                        <div className='text-center'>

                            <label className="font-serif text-xl font-semibold text-center mb-0">Categorias</label>
                            <p className='my-0 text-sm text-gray-500 italic'>(Separadas por comas)</p>
                        </div>
                        <input value={pcategory} onChange={handlePcategory} type="text" name="pcategory" placeholder="Categorias..." className="font-serif   block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl mb-0" />

                        <ul className='font-serif flex flex-wrap justify-center mb-6'>
                            {
                                (comas(pcategory).split(',')[0] !== '') ? (
                                    comas(pcategory).split(',').map((el, i) => {
                                        return (
                                            <li className={colores(i)}>{primeraMayuscula(el)}</li>
                                        )
                                    })

                                ) : ''
                            }

                        </ul>

                    </div>

                    <label className="block">
                        <span class="sr-only">Subir imagen</span>
                        <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleFileChange} class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-200 ml-2" />
                    </label>

                    <img src={image ? image : imagenNotFound} alt='product' className='font-serif w-28 inline py-4 mb-4' />
                    <button type='submit' className='font-serif bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded text-xl mb-4 mb-20'>Crear producto</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productos: state.productos,
        categorias: state.categorias,
        // implementar productoToEdit
        productoToEdit: state.productoToEdit,
        input1: state.input1,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setForm: () => dispatch(setForm()),
        setProductos: (input) => dispatch(setProductos(input)),
        filtrarProductos: (lista, filtro) => dispatch(filtrarProductos(lista, filtro)),
        // implementar setEdit
        setEdit: (id, productoLista) => dispatch(setEdit(id, productoLista)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CrearProducto);

