import React from "react";
import { useState } from "react";
import CortinaBlancaVentas from "../CortinaBlancaVentas/CortinaBlancaVentas";
import SumarFormVentas from "../SumarFormVentas/SumarFormVentas";

export default function ProductosElegidosVentas({ productosElegidos, setCantidades, cantidades, setProductosElegidos }) {
    const [gatilloSumar, setGatilloSumar] = useState(false)
    const [editable, setEditable] = useState(0)

    return (
        <div>
            <SumarFormVentas productos={productosElegidos} gatillo={gatilloSumar} numero={cantidades} setNumero={setCantidades} id={editable} />
            <CortinaBlancaVentas gatillo={gatilloSumar} setGatillo={setGatilloSumar} />
            <ul className="text-center">
                <li key={'-1'} className={'text-base border-b-2 mb-1 py-1 p-1  last:border-b-0 border-black last:mb-0 text-center flex flex-row items-center justify-center '}>
                    <div className="w-[10%]"></div>
                    <div className="flex flex-row justify-between items-center font-bold bg-slate-50 w-[80%]">
                        <h1 className='w-[20%]'>Nombre</h1>
                        <h1 className='w-[20%]'>Stock</h1>
                        <h1 className='w-[20%]'>Precio</h1>
                        <h1 className='w-[20%]'>Img</h1>
                        <h1 className='w-[20%]'>Cantidad</h1>
                    </div>
                    <div className="w-[10%]"></div>


                </li>
                {productosElegidos?.map((producto) => {
                    return (

                        <li key={producto.id} className='border-b-2 mb-1 py-1 p-1 last:border-b-0 border-black last:mb-0 flex flex-row items-center justify-center text-sm'>
                            <button className="w-[10%]" onClick={
                                () => {
                                    // al hacer click en la X elimino el producto del array productosElegidos
                                    setProductosElegidos(productosElegidos.filter((prod) => prod.id !== producto.id))
                                    // elimino de cantidades el id y el valor de producto que eliminare
                                    delete cantidades[producto.id]
                                }
                            }>X</button>
                            <div className="flex flex-row justify-between items-center w-[80%]">
                                <p className='w-[20%]'>{producto.name}</p>
                                <p className='w-[20%]'>{producto.stock}</p>
                                <p className='w-[20%]'>${producto.price}</p>
                                <img src={producto.imagen} alt="producto" className='mx-auto px-2 h-[5vh] max-w-[20%]' />
                                <p className='w-[20%]'>{
                                    // accedo al objeto cantidades con el id del producto de turno y muestro la cantidad aca
                                    cantidades[producto.id]
                                }</p>
                            </div>
                            <button onClick={() => {
                                setGatilloSumar(true)
                                setEditable(producto.id)
                            }} className="w-[10%]">+</button>
                        </li>
                    )
                }
                )}
            </ul>
            <hr/>
        </div>
    )
}