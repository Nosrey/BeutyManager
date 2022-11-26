import React from 'react';
import './product.css'

export default function Product({ name, stock, price, avaible }) {
    if (avaible === false) avaible = "no";
    else avaible = "si"
    return (
        <div className='caja'>
            <h3>{name}</h3>
            <h3>{stock}</h3>
            <h3>{price}</h3>
            <h3>{avaible}</h3>
        </div>
    )
}