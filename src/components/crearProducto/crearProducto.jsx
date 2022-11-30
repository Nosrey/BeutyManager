import React, { useState } from 'react';
import Axios from 'axios';
import { setForm, setProductos, filtrarProductos } from '../../actions/index'
import { connect } from "react-redux";
import './crearProducto.css'

function CrearProducto({ setForm, visible, setProductos, productos, filtrarProductos }) {
    const [errorMessages, setErrorMessages] = useState({});
    const [image, setImage] = useState('')

    function cerrar(e) {
        e.preventDefault();
        setForm()
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

        var { pname, pstock, pprice } = document.forms[0];

        if (pname.value && pstock.value && pprice.value) {
            const productData = { name: pname.value, imagen: image, stock: pstock.value, price: pprice.value, avaible: true }
            Axios.post('http://localhost:3001/products', productData)
                .then((el) => alert('fue publicado correctamente: ', el))
                .then(() => setForm())
                .then(() => setProductos())
                .then(() => {
                    pname.value = '';
                    pstock.value = '';
                    pprice.value = '';
                    setImage('')
                })
                .then(() => {
                    filtrarProductos(productos, '')
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
            <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
            <div className="form">
                <form>
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setForm: () => dispatch(setForm()),
        setProductos: () => dispatch(setProductos()),
        filtrarProductos: (lista, filtro) => dispatch(filtrarProductos(lista, filtro)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CrearProducto);