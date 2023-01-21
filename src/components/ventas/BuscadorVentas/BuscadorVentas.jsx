// creo un componente vacio en jsx
// importo useState
import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from "react-redux";

function BuscadorVentas({ productos, setProductosVentas }) {
    // creo un estado para el input
    const [input, setInput] = useState('');

    // creo una funcion para manejar el input
    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    // creo un useEffect cuando el input cambie de valor y busco en la lista productos en base a lo que hay en el input y lo guaqrdo en setProductosVentas
    useEffect(() => {
        let productosFiltrados = productos.filter(producto => producto.name.toLowerCase().includes(input.toLowerCase()));
        setProductosVentas(productosFiltrados);
        // eslint-disable-next-line
    }, [input])
    

    return (
        <div className='focus:bg-red-500'>
            <input type="search" value={input} onChange={handleInputChange} placeholder='Agregar Producto' className='border-2 border-black ' />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productos: state.productos
    }
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BuscadorVentas);