import React, { useState } from 'react';
import Axios from 'axios';
import { setForm, setProductos, filtrarProductos, setCategorias } from '../../actions/index'
import { connect } from "react-redux";
import './crearProducto.css'


let ready = true;
let arranque = false;

function CrearProducto({ setForm, visible, setProductos, productos, filtrarProductos, categorias, setCategorias }) {

    if (visible) { arranque = true; }

    const imagenNotFound = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-4.png'
    const paleta = ["text-fuchsia-400", "text-purple-500", "text-violet-500", "text-indigo-500", "text-blue-500", "text-sky-500", "text-cyan-500", "text-teal-500"]

    const bordes = ["border-fuchsia-400", "border-purple-500", "border-violet-500", "border-indigo-500", "border-blue-500", "border-sky-500", "border-cyan-500", "border-teal-500"]

    const notFound = 'No existe esa categoria';
    const [image, setImage] = useState(imagenNotFound)
    const [pcategory, setPcategory] = useState('')
    const [filterCategories, setFilterCategories] = useState('')

    const [animacion, setAnimacion] = useState(true)

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

    function finalElement(valorArray) {
        let ultimoValor = comas(valorArray)
        let final = ultimoValor.split(',')
        if (final.length) return final[final.length - 1]
        else return ''
    }

    function handlePcategory(e) {
        let valor = e.target.value; // valor del input
        let ultimoValor = finalElement(valor);
        setPcategory(valor);
        let filtro = categorias.find((el) => el.name.toLowerCase().includes(ultimoValor.toLowerCase()))
        if (!filtro || ultimoValor === '' || ultimoValor === ' ') filtro = { name: notFound }
        setFilterCategories(filtro.name)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //Prevent page reload

        if (ready) {
            ready = false;

            var { pname, pstock, pprice, ppriceBuy, pcategory } = document.forms[0];

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
                    alert('Debes introducir un numero entero en la cantidad de stock del producto, tu valor sera ignorado')
                }
            }
            else {
                pstock.value = 0
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

            if (pname.value && pstock.value && pprice.value && ppriceBuy.value) {
                let salir = 0; // para disparar la salida
                // eslint-disable-next-line
                productos.map(el => {
                    if (el.name === pname.value) return salir = 1
                })
                if (salir > 0) return alert("Este producto ya existe, no puede ser agregado")

                let categoryNames = []  // para guardar el name de las categorias validas
                if (pcategory.value) { // para que si no hay categorias no cree problemas
                    let noCreated = []  // para guardar el nombre de las categorias que no estan creadas
                    let items = comas(pcategory.value).split(',') // separamos en un array los elementos con comas
                    for (let i = 0; i < items.length; i++) {
                        let conteo = 0 // para averiguar que categorias no estan en la database
                        for (let j = 0; j < categorias.length; j++) {
                            if (items[i].toLowerCase() === categorias[j].name.toLowerCase()) {
                                conteo = 1;
                                categoryNames.push(categorias[j].name);
                            }
                        }
                        if (!conteo > 0) noCreated.push(items[i])
                    }

                    if (noCreated.length) Axios.post('http://localhost:3001/categories', { arr: noCreated }) // para enviar las categorias por crear
                    categoryNames = categoryNames.concat(noCreated)
                }

                const productData = { name: pname.value, imagen: image, stock: pstock.value, price: pprice.value, priceBuy: ppriceBuy.value, avaible: true, categoryNames: categoryNames }
                console.log('Soy el producto que enviaras: ', productData)
                Axios.post('http://localhost:3001/products', productData)
                    .then((el) => alert('fue publicado correctamente: ', el))
                    .then(() => setForm()) // para mostrar el formulario
                    .then(() => setProductos()) // para pedir los productos actualizados
                    .then(() => setCategorias()) // para pedir los productos actualizados
                    .then(() => {  // vaciamos el formulario
                        pname.value = '';
                        pstock.value = '';
                        pprice.value = '';
                        ppriceBuy.value = '';
                        setPcategory('');
                        setImage(imagenNotFound);
                        setFilterCategories('');
                    })
                    .then(() => {
                        filtrarProductos(productos, '') // actualizamos el filtro al crear un nuevo producto
                    })
                    .then(() => ready = true)

                    .catch((err) => {
                        ready = true;
                    })
            } else {
                // Username not found
                if (!pname) alert('Debes agregar un nombre')
                if (!pstock) alert('debes agregar la cantidad de stock')
                if (!pprice) alert('debes agregar el precio')
                ready = true
            }
        };
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
            .catch(err => console.log('hubo un error: ', err))

    }



    return (
        <div className={
            "left-[0%] fixed bg-white w-96 h-screen border-2 rounded-md border-l-0 hover:border-sky-200 overflow-auto  p-4 pt-1 top-0 "
            // max-h-screen
            + (arranque ? (visible ? "pot" : "pot2") : 'fuera2')
        }
        >
            <button className='font-serif bg-red-600 text-white absolute top-2 right-2 px-1.5 font-black hover:bg-red-300 text-xl' onClick={cerrar}>X</button>
            <div className="font-serif ">
                <form onSubmit={handleSubmit} autoComplete="off" className='font-serif flex flex-col items-center'>
                    <div className="font-serif input-container">
                        <label className="font-serif text-xl font-semibold text-center">Nombre del producto</label>
                        <input type="text" name="pname" placeholder='Nombre...' className="font-serif  mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" required />

                    </div>
                    <div className="font-serif input-container">
                        <label className="font-serif text-xl font-semibold text-center">Cantidad Disponible</label>
                        <input type="text" name="pstock" placeholder='Cantidad...' className="font-serif  mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" required />

                    </div>
                    <div className="font-serif input-container">
                        <label className="font-serif text-xl font-semibold text-center">Precio de venta del producto</label>
                        <input id="price" type="text" name="pprice" placeholder="Precio de venta..." className="font-serif  mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" required />

                    </div>

                    <div className="font-serif input-container">
                        <label className="font-serif text-xl font-semibold text-center">Precio de compra del producto</label>
                        <input id="priceBuy" type="text" name="ppriceBuy" placeholder="Precio de compra..." className="font-serif  mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" required />

                    </div>
                    <div className="font-serif input-container flex flex-col items-center">
                        <div className='text-center'>
                            
                        <label className="font-serif text-xl font-semibold text-center mb-0">Categorias</label>
                        <p className='my-0 text-sm text-gray-500 italic'>(Separadas por comas)</p>
                        </div>
                        <input value={pcategory} onChange={handlePcategory} type="text" name="pcategory" placeholder="Categorias..." className="font-serif  mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />

                        <p>{(finalElement(pcategory).toLowerCase() === filterCategories.toLowerCase() && finalElement(pcategory).length) ? <p className='font-serif my-1'></p> : (filterCategories === notFound) ? <p className='font-serif my-1 text-gray-500 italic'>{filterCategories}</p> : <div className='font-serif my-1'><p className='font-serif inline text-gray-500 italic'>Sugerencia: </p><p className='font-serif inline'>{primeraMayuscula(filterCategories)}</p></div>}</p>

                        <ul className='font-serif flex flex-wrap justify-center mb-3'>
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

                    <img src={image ? image : imagenNotFound} alt='product' className='font-serif w-28 inline py-4 mb-1' />
                    <button type='submit' className='font-serif bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded text-xl mb-4'>Crear producto</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productos: state.productos,
        categorias: state.categorias
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setForm: () => dispatch(setForm()),
        setProductos: () => dispatch(setProductos()),
        filtrarProductos: (lista, filtro) => dispatch(filtrarProductos(lista, filtro)),
        setCategorias: () => dispatch(setCategorias()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CrearProducto);

