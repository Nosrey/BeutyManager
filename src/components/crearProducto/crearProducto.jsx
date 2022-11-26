import React, { useState } from 'react';
import Axios from 'axios';
import { setForm, setProductos } from '../../actions/index'
import { connect } from "react-redux";
import './crearProducto.css'

function CrearProducto({ mostrarForm, setForm, visible, setProductos }) {
    const [errorMessages, setErrorMessages] = useState({});

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

        if (pname && pstock && pprice) {
            const productData = { name: pname.value, stock: pstock.value, price: pprice.value, avaible: true }
            console.log(productData)
            Axios.post('http://localhost:3001/products', productData)
                .then((el) => alert('fue publicado correctamente: ', el))
                .then(() => setForm())
                .then(() => setProductos())
        } else {
            // Username not found
            if (!pname) setErrorMessages({ name: "pname", message: errors.pname });
            if (!pstock) setErrorMessages({ name: "pstock", message: errors.pstock });
            if (!pprice) setErrorMessages({ name: "pprice", message: errors.pprice });
        }
    };

    return (
        <div className={visible? "formularioProducto" : 'invisible'}>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Nombre del producto: </label>
                        <input type="text" name="pname" required />
                        {renderErrorMessage("pname")}
                    </div>
                    <div className="input-container">
                        <label>Cantidad Disponible: </label>
                        <input type="text" name="pstock" required />
                        {renderErrorMessage("pstock")}
                    </div>
                    <div className="input-container">
                        <label>Precio del producto: </label>
                        <input type="text" name="pprice" required />
                        {renderErrorMessage("pprice")}
                    </div>
                    <div className="button-container">
                        <input type="submit" value='Crear producto' />
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        mostrarForm: state.mostrarForm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setForm: () => dispatch(setForm()),
        setProductos: () => dispatch(setProductos()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CrearProducto);