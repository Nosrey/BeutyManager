import React from 'react';
import { setEdit } from '../../actions';
import { connect } from "react-redux";
import './product.css'

function Product({ productos, id, name, imagen, stock, price, avaible, setEdit, Categories, mostrarEdit }) {
    if (avaible === false) avaible = "no";
    else avaible = "si"

    function mostrarCategorias(arr) {
        // console.log('soy el arr prohibido de ' + name +': ' ,arr)
        if (arr.length) {
            let arrFinal = []
            for (let i = 0; i < arr.length; i++) {
                arrFinal.push(arr[i].name)
            }
            return arrFinal.join(', ')
        } else {
            return arr
        }
    }

    return (
        <div className='caja'>
            <h3 className='elemento'>{name}</h3>
            <h3 className='elemento'>{stock}</h3>
            <h3 className='elemento'>{price}</h3>
            <h3 className='elemento'>{avaible}</h3>
            <p className='elemento'>{Categories.length?mostrarCategorias(Categories) : ''}</p>
            <img src={imagen} alt="Product" sizes='' />
            <button onClick={() => setEdit(id, productos)}>Editar</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productos: state.productos,
        mostrarEdit: state.mostrarEdit,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setEdit: (id, productoLista) => dispatch(setEdit(id, productoLista)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);