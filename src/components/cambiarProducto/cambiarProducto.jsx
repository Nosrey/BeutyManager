import React, { useState } from 'react';
import Axios from 'axios';
import { setEdit, setProductos } from '../../actions/index'
import { connect } from "react-redux";
import './cambiarProducto.css'

function CambiarProducto({ setEdit, visible, setProductos, productos, productoToEdit }) {
    const [image, setImage] = useState('')

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

        var { pname, pstock, pprice } = document.forms[1];

        let productData = {}

        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === productoToEdit.id) productData = productos[i]
        }

        if (pname.value) productData.name = pname.value
        if (pstock.value) productData.stock = pstock.value
        if (pprice.value) productData.price = pprice.value
        if (image) productData.imagen = image

        Axios.put('http://localhost:3001/products/' + productoToEdit.id, productData)
            .then((el) => alert('fue editado correctamente: ', el))
            .then(() => setEdit(productoToEdit.id, productos))
            .then(() => setProductos())
            .then(() => {
                pname.value = '';
                pstock.value = '';
                pprice.value = '';
                setImage('')
            })
    };

    return (
        <div className={visible ? "formularioProducto" : 'invisible'}>
            <button className='cerrar-btn' onClick={cerrar}>X</button>
            <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
            <div className="form">
                <form>
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setEdit: (id, productoLista) => dispatch(setEdit(id, productoLista)),
        setProductos: () => dispatch(setProductos()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CambiarProducto);