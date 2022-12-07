import React, { useState } from 'react';
import Axios from 'axios';
import { setEdit, setProductos, setCategorias } from '../../actions/index'
import { connect } from "react-redux";
import './cambiarProducto.css'

function CambiarProducto({ setEdit, visible, setProductos, productos, productoToEdit, categorias, setCategorias }) {
    const notFound = 'No existe esa categoria';
    const [image, setImage] = useState('')
    const [pcategory, setPcategory] = useState('')
    const [filterCategories2, setFilterCategories2] = useState('')

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
        setFilterCategories2(filtro.name)
    }

    function cerrar(e) {
        e.preventDefault();
        setEdit(productoToEdit.id, productos)
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
        //Prevent page reload
        e.preventDefault();
        console.log('entre a enviar')

        var { pname, pstock, pprice, pcategory } = document.forms[1];

        let productData = {}

        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === productoToEdit.id) productData = productos[i]
        }

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
            console.log('las no creadas son: ', noCreated)
            if (noCreated.length) Axios.post('http://localhost:3001/categories', { arr: noCreated }) // para enviar las categorias por crear
            categoryNames = categoryNames.concat(noCreated)
            console.log("3 agregue las nuevas categorias")
            console.log("por cierto, las nuevas categorias son: ", categoryNames)
        }


        if (pname.value) productData.name = pname.value
        if (pstock.value) productData.stock = pstock.value
        if (pprice.value) productData.price = pprice.value
        if (categoryNames.length) productData.categoryNames = categoryNames
        if (!categoryNames.length) productData.categoryNames = []

        if (image) productData.imagen = image

        console.log('el producto a enviar es: ', productData)

        Axios.put('http://localhost:3001/products/' + productoToEdit.id, productData)
            .then((el) => alert('fue editado correctamente: ', el))
            .then(() => setEdit(productoToEdit.id, productos))
            .then(() => setProductos())
            .then(() => setCategorias()) // para pedir los productos actualizados
            .then(() => {
                pname.value = '';
                pstock.value = '';
                pprice.value = '';
                setPcategory('')
                setImage('')
                setFilterCategories2('');
            })
    };

    return (
        <div className={visible ? "formularioProducto" : 'invisible'}>
            <button className='cerrar-btn' onClick={cerrar}>X</button>
            <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
            <div className="form">
                <form autoComplete="off">
                    <div className="input-container">
                        <label>Nombre del producto: </label>
                        <input type="text" name="pname" placeholder={productoToEdit.name} />
                    </div>
                    <div className="input-container">
                        <label>Cantidad Disponible: </label>
                        <input type="text" name="pstock" placeholder={productoToEdit.stock} />
                    </div>
                    <div className="input-container">
                        <label>Precio del producto: </label>
                        <input type="text" name="pprice" placeholder={productoToEdit.price} />
                    </div>
                    <div className="input-container">
                        <label>Categorias del producto: </label>
                        <input type="text" value={pcategory} onChange={handlePcategory} name="pcategory" placeholder={productoToEdit.Categories?.map(el => { return el.name })} />
                        <p>{(finalElement(pcategory).toLowerCase() === filterCategories2.toLowerCase() && finalElement(pcategory).length) ? '' : (filterCategories2 === notFound) ? filterCategories2 : 'Sugerencia: ' + filterCategories2}</p>
                    </div>
                    <button className='boton-imagen' onClick={showUploadWidget}>Subir Imagen</button>

                    <button className='boton-imagen' onClick={handleSubmit}>Actualizar Producto</button>
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