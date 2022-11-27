import React from 'react';
import CambiarProducto from '../cambiarProducto/cambiarProducto.jsx'
import { setEdit } from '../../actions';
import { connect } from "react-redux";
import './product.css'

function Product({ id, name, imagen, stock, price, avaible, setEdit, mostrarEdit }) {
    if (avaible === false) avaible = "no";
    else avaible = "si"

    return (
        <div className='caja'>
            <h3>{name}</h3>
            <h3>{stock}</h3>
            <h3>{price}</h3>
            <h3>{avaible}</h3>
            <img src={imagen} alt="Product"/>
            <CambiarProducto productId={id} visible={mostrarEdit} pname={name} pstock={stock} pprice={price}/>
            <button onClick={setEdit}>Editar</button>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        mostrarEdit: state.mostrarEdit,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setEdit: () => dispatch(setEdit()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);