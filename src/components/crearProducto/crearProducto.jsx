import React, { useState } from 'react';
import Axios from 'axios';
import { setForm, setProductos, filtrarProductos, setCategorias } from '../../actions/index'
import { connect } from "react-redux";
import './crearProducto.css'

let ready = true;
function CrearProducto({ setForm, visible, setProductos, productos, filtrarProductos, categorias, setCategorias }) {
    const notFound = 'No existe esa categoria';
    const [image, setImage] = useState('')
    const [pcategory, setPcategory] = useState('')
    const [filterCategories, setFilterCategories] = useState('')

    function cerrar(e) {
        e.preventDefault();
        setForm()
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

    function showUploadWidget(e) {
        e.preventDefault();
        window.cloudinary.openUploadWidget({
            cloudName: "dyg5hutpb",
            uploadPreset: "ejemplo",
            sources: [
                "local",
                "url"
            ],
            googleApiKey: "<image_search_google_api_key>",
            showAdvancedOptions: true,
            //  multiple: false, debe ser eliminado para que funcione bien
            //  cropping: true, esta tambien
            defaultSource: "local",
            styles: {
                palette: {
                    window: "#ffffff",
                    sourceBg: "#f4f4f5",
                    windowBorder: "#90a0b3",
                    tabIcon: "#000000",
                    inactiveTabIcon: "#555a5f",
                    menuIcons: "#555a5f",
                    link: "#0433ff",
                    action: "#339933",
                    inProgress: "#000519",
                    complete: "#339933",
                    error: "#cc0000",
                    textDark: "#000000",
                    textLight: "#fcfffd"
                },
                fonts: {
                    default: null,
                    "'Acme', sans-serif": {
                        url: "https://fonts.googleapis.com/css?family=Acme",
                        active: true
                    }
                }
            }
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info.secure_url);
                    setImage(result.info.secure_url)
                }
                else if (error) { console.log('parece que hubo un error: ', error) }
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //Prevent page reload

        if (ready) {
            ready = false;

            var { pname, pstock, pprice, pcategory } = document.forms[0];

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

            if (pname.value && pstock.value && pprice.value) {
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

                const productData = { name: pname.value, imagen: image, stock: pstock.value, price: pprice.value, avaible: true, categoryNames: categoryNames }
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
                        setPcategory('');
                        setImage('');
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

    return (
        <div className={visible ? "fixed bg-white w-1/3 top-20 border-2 rounded-md border-l-0 hover:border-sky-200" : 'hidden'}>
            <button className='bg-red-600 text-white absolute top-1 right-2 px-1.5 font-black hover:bg-red-300 text-xl' onClick={cerrar}>X</button>
            <div className="">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="input-container">
                        <label className="text-lg font-semibold text-center">Nombre del producto</label>
                        <input type="text" name="pname" placeholder='Nombre...' className=" mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-base shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" required />

                    </div>
                    <div className="input-container">
                        <label className="text-lg font-semibold text-center">Cantidad Disponible</label>
                        <input type="text" name="pstock" placeholder='Cantidad...' className=" mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-base shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" required />

                    </div>
                    <div className="input-container">
                        <label className="text-lg font-semibold text-center">Precio del producto</label>
                        <input id="price" type="text" name="pprice" placeholder="Precio..." className=" mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-base shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" required />

                    </div>
                    <div className="input-container">
                        <label className="text-lg font-semibold text-center">Categorias</label>
                        <input value={pcategory} onChange={handlePcategory} type="text" name="pcategory" placeholder="Categorias..." className=" mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-base shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" required />

                        <p>{(finalElement(pcategory).toLowerCase() === filterCategories.toLowerCase() && finalElement(pcategory).length) ? '' : (filterCategories === notFound) ? filterCategories : 'Sugerencia: ' + filterCategories}</p>
                    </div>
                    <button type="button" className='boton-imagen' onClick={showUploadWidget}>Subir imagen</button>

                    <button type='submit' className='boton-imagen'>Crear producto</button>
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