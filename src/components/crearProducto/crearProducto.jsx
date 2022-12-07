import React, { useState } from 'react';
import Axios from 'axios';
import { setForm, setProductos, filtrarProductos, setCategorias } from '../../actions/index'
import { connect } from "react-redux";
import './crearProducto.css'

function CrearProducto({ setForm, visible, setProductos, productos, filtrarProductos, categorias, setCategorias }) {
    const notFound = 'No existe esa categoria';
    const [errorMessages, setErrorMessages] = useState({});
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



    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const errors = {
        pname: "Por favor ingresa el nombre",
        pstock: "Por favor ingresa cantidad",
        pprice: 'Por favor ingresa un precio',
    };

    const handleSubmit = (e) => {
        //Prevent page reload
        e.preventDefault();
        console.log("1 entre al submit")
        var { pname, pstock, pprice, pcategory } = document.forms[0];

        if (pname.value && pstock.value && pprice.value) {
            let salir = 0; // para disparar la salida
            // eslint-disable-next-line
            productos.map(el => {
                if (el.name === pname.value) return salir = 1 
            })
            if (salir > 0) return alert("Este producto ya existe, no puede ser agregado")
            console.log("2 confirme que los valores llegaron en el primer if")

            let categoryNames = []  // para guardar el name de las categorias validas
            if (pcategory.value) { // para que si no hay categorias no cree problemas
                let noCreated = []  // para guardar el nombre de las categorias que no estan creadas
                let items = comas(pcategory.value).split(',') // separamos en un array los elementos con comas
                console.log('hola soy items: ', items)
                for (let i = 0; i < items.length; i++) {
                    let conteo = 0 // para averiguar que categorias no estan en la database
                    for (let j = 0; j < categorias.length; j++) {
                        if (items[i].toLowerCase() === categorias[j].name.toLowerCase()) {
                            conteo = 1;
                            categoryNames.push(categorias[j].name);
                        }
                    }
                    if (!conteo > 0) noCreated.push(items[i])
                    console.log('Termine una vuelta')
                    console.log(categoryNames)
                }

                if (noCreated.length) Axios.post('http://localhost:3001/categories', {arr: noCreated}) // para enviar las categorias por crear
                categoryNames = categoryNames.concat(noCreated)
                console.log("3 agregue las nuevas categorias")
                console.log("por cierto, las nuevas categorias son: ", categoryNames)
            } 

            const productData = { name: pname.value, imagen: image, stock: pstock.value, price: pprice.value, avaible: true, categoryNames: categoryNames }
            console.log('4 hola soy el producto que enviaras: ', productData)
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
        } else {
            // Username not found
            if (!pname) setErrorMessages({ name: "pname", message: errors.pname });
            if (!pstock) setErrorMessages({ name: "pstock", message: errors.pstock });
            if (!pprice) setErrorMessages({ name: "pprice", message: errors.pprice });
        }
    };

    return (
        <div className={visible ? "formularioProducto" : 'invisible'}>
            <button className='cerrar-btn' onClick={cerrar}>X</button>
            <div className="form">
                <form autoComplete="off">
                    <div className="input-container">
                        <label>Nombre del producto: </label>
                        <input type="text" name="pname" placeholder='Nombre...' required />
                        {renderErrorMessage("pname")}
                    </div>
                    <div className="input-container">
                        <label>Cantidad Disponible: </label>
                        <input type="text" name="pstock" placeholder='Cantidad...' required />
                        {renderErrorMessage("pstock")}
                    </div>
                    <div className="input-container">
                        <label>Precio del producto: </label>
                        <input type="text" name="pprice" placeholder="Precio..." required />
                        {renderErrorMessage("pprice")}
                    </div>
                    <div className="input-container">
                        <label>Categorias: </label>
                        <input value={pcategory} onChange={handlePcategory} type="text" name="pcategory" placeholder="Categorias..." required />
                        {renderErrorMessage("pcategory")}
                        <p>{(finalElement(pcategory).toLowerCase() === filterCategories.toLowerCase() && finalElement(pcategory).length) ? '' : (filterCategories === notFound) ? filterCategories : 'Sugerencia: ' + filterCategories}</p>
                    </div>
                    <button className='boton-imagen' onClick={showUploadWidget}>Subir imagen</button>

                    <button className='boton-imagen' onClick={handleSubmit}>Crear producto</button>
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