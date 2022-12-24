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
        <div className='font-serif flex flex-row items-center justify-center text-center w-screen flex-auto flex justify-around'>
            <h3 className='basis-0 flex-grow'>{name}</h3>
            <h3 className='basis-0 flex-grow'>{stock}</h3>
            <h3 className='basis-0 flex-grow'>{price}</h3>
            <h3 className='basis-0 flex-grow'>{avaible}</h3>
            <h3 className='basis-0 flex-grow'>{Categories.length?mostrarCategorias(Categories) : ''}</h3>
            <img className='basis-0 flex-grow w-auto' src={imagen} alt="Product" />
            <button className="basis-0 flex-grow " onClick={() => setEdit(id, productos)}>Editar</button>
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