import React, { useState } from 'react';
import { connect } from "react-redux";
import './Login.css'


function Login({ dataUser }) {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (e) => {
        //Prevent page reload
        e.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = dataUser.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    const continuar = (e) => {
        e.preventDefault();
        window.location.replace("http://localhost:3000/products");
    }

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Usuario </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Contraseña </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    )

    const userIsLogged = (
        <div className="form">
            <form onSubmit={continuar}>
                <h2>
                    Usuario validado correctamente
                </h2>
                <div className="button-container">
                    <input type="submit" value='Continuar' />
                </div>
            </form>
        </div>
    )

    console.log('hola soy dataUser ', dataUser)

    return (
        <div className="login-form">
            <div className="title">Acceder</div>
            {isSubmitted ? userIsLogged : renderForm}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dataUser: state.dataUser
    }
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);