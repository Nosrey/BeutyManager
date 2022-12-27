import React, { useState } from 'react';
import Axios from 'axios';
import { setEdit, setProductos, setCategorias } from '../../actions/index'
import { connect } from "react-redux";
import './cambiarProducto.css'

let ready = true;
let arranque = false;
let primeraVez = true;
let textPrimeraVez = ''
function CambiarProducto({ setEdit, visible, setProductos, productos, productoToEdit, categorias, setCategorias }) {

    if (visible) { arranque = true; }

    const paleta = ["text-fuchsia-400", "text-purple-500", "text-violet-500", "text-indigo-500", "text-blue-500", "text-sky-500", "text-cyan-500", "text-teal-500"]

    const bordes = ["border-fuchsia-400", "border-purple-500", "border-violet-500", "border-indigo-500", "border-blue-500", "border-sky-500", "border-cyan-500", "border-teal-500"]

    const imagenNotFound = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-4.png'

    const notFound = 'No existe esa categoria';
    const [image, setImage] = useState(imagenNotFound)
    const [pcategory, setPcategory] = useState('')
    const [filterCategories2, setFilterCategories2] = useState('')

    if (primeraVez) {
        textPrimeraVez = '';
        if (productoToEdit.Categories) {
            for (let i = 0; i < productoToEdit.Categories.length; i++) {
                textPrimeraVez = textPrimeraVez + productoToEdit.Categories[i].name;
                if (i + 1 < productoToEdit.Categories.length) textPrimeraVez += ', '
            }
        }

        console.log('hola soy yo tu padre: ', textPrimeraVez)
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
        primeraVez = false;
        let valor = e.target.value; // valor del input
        let ultimoValor = finalElement(valor);
        setPcategory(valor);
        let filtro = categorias.find((el) => el.name.toLowerCase().includes(ultimoValor.toLowerCase()))
        if (!filtro || ultimoValor === '' || ultimoValor === ' ') filtro = { name: notFound }
        setFilterCategories2(filtro.name)
    }

    function cerrar(e) {
        e.preventDefault();
        textPrimeraVez = ''
        primeraVez = true;
        setEdit(productoToEdit.id, productos)
        var { pname, pstock, pprice } = document.forms[1];
        pname.value = '';
        pstock.value = '';
        pprice.value = '';
        setPcategory('')
        setImage(imagenNotFound)
        setFilterCategories2('');
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
            .catch(err => console.log('hubo un error: ', err))

    }

    const handleSubmit = (e) => {
        //Prevent page reload
        e.preventDefault();

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
                if (noCreated.length) Axios.post('http://192.168.1.108:3001/categories', { arr: noCreated }) // para enviar las categorias por crear
                categoryNames = categoryNames.concat(noCreated)
            }

            if (pname.value) {
                let nombre = eliminarAcentos(pname.value);
                productData.name = nombre;
            }
            if (pstock.value) productData.stock = pstock.value
            if (pstockDeposito.value) productData.stockDeposito = pstockDeposito.value
            if (pprice.value) productData.price = pprice.value
            if (ppriceBuy.value) productData.priceBuy = ppriceBuy.value
            if (categoryNames.length) productData.categoryNames = categoryNames
            if (!categoryNames.length) productData.categoryNames = []

            if (image && image !== imagenNotFound) productData.imagen = image

            console.log('el producto a enviar es: ', productData)

            Axios.put('http://192.168.1.108:3001/products/' + productoToEdit.id, productData)
                .then((el) => alert('fue editado correctamente: ', el))
                .then(() => setEdit(productoToEdit.id, productos))
                .then(() => setProductos())
                .then(() => setCategorias()) // para pedir los productos actualizados
                .then(() => {
                    pname.value = '';
                    pstock.value = '';
                    pstockDeposito.value = '';
                    pprice.value = '';
                    ppriceBuy.value = '';
                    setPcategory('')
                    setImage(imagenNotFound)
                    setFilterCategories2('');
                })
                .then(() => ready = true)

                .catch((err) => {
                    console.log('error en cambiar producto: ', err);
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

    return (
        <div className={
            "right-[0%] fixed bg-white w-96 h-screen border-2 rounded-md border-l-0 hover:border-sky-200 overflow-auto  p-4 pt-1 top-0 "
            // max-h-screen
            + (arranque ? (visible ? "potb" : "pot2b") : 'fuera')
        }
        >
            <button className='font-serif bg-red-600 text-white absolute top-2 right-3 px-1.5 font-black hover:bg-red-300 text-xl' onClick={cerrar}>X</button>
            <div className="font-serif ">
                <form onSubmit={handleSubmit} autoComplete="off" className='font-serif flex flex-col items-center'>
                    <div className="font-serif input-container">
                        <label className="font-serif text-xl font-semibold text-center">Nombre del producto</label>
                        <input type="text" name="pname" placeholder={productoToEdit.name} className="font-serif  mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 py-5 text-xl" />
                    </div>
                    <div className="font-serif input-container">
                        <label className="font-serif text-xl font-semibold text-center">Cantidad en Deposito</label>
                        <input type="number" step="1" name="pstock" placeholder={productoToEdit.stock} className="font-serif  mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl" />
                    </div>
                    <div className="font-serif input-container">
                        <label className="font-serif text-xl font-semibold text-center">Cantidad en Tienda</label>
                        <input type="number" step="1" name="pstockDeposito" placeholder={productoToEdit.stockDeposito} className="font-serif  mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl" />
                    </div>
                    <div className="font-serif input-container">
                        <label className="font-serif text-xl font-semibold text-center">Precio de venta</label>
                        <input type="number" step="0.01" name="pprice" placeholder={productoToEdit.price} className="font-serif  mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl" />
                    </div>
                    <div className="font-serif input-container">
                        <label className="font-serif text-xl font-semibold text-center">Precio de compra</label>
                        <input type="number" step="0.01" name="ppriceBuy" placeholder={productoToEdit.priceBuy} className="font-serif  mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl" />
                    </div>
                    <div className="font-serif input-container text-center">
                        <label className="font-serif text-xl font-semibold text-center">Categorias del producto</label>
                        <input type="text" value={primeraVez ? productoToEdit.Categories?.map(el => { return el.name }) : pcategory} onChange={handlePcategory} name="pcategory" placeholder={productoToEdit.Categories?.map(el => { return el.name })} className="font-serif  mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 text-xl py-5" />

                        <p>{(finalElement(pcategory).toLowerCase() === filterCategories2.toLowerCase() && finalElement(pcategory).length) ? <p className='font-serif my-1'></p> : (filterCategories2 === notFound) ? <p className='font-serif my-1 text-gray-500 italic'>{filterCategories2}</p> : <div className='font-serif my-1'><p className='font-serif inline text-gray-500 italic'>Sugerencia: </p><p className='font-serif inline'>{primeraMayuscula(filterCategories2)}</p></div>}</p>

                        <ul className='font-serif flex flex-wrap justify-center mb-3 '>
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

                    <img src={(image !== imagenNotFound) ? image : (productoToEdit.imagen) ? productoToEdit.imagen : image} alt='product' className='font-serif w-28 inline py-4' />

                    <button type='submit' className='font-serif bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded text-xl'>Actualizar Producto</button>
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setEdit: (id, productoLista) => dispatch(setEdit(id, productoLista)),
        setProductos: () => dispatch(setProductos()),
        setCategorias: () => dispatch(setCategorias()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CambiarProducto);