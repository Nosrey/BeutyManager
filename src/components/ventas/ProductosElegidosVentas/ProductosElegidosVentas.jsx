import React from "react";
import { useState } from "react";
import CortinaBlancaVentas from "../CortinaBlancaVentas/CortinaBlancaVentas";
import SumarFormVentas from "../SumarFormVentas/SumarFormVentas";
// importo la imagen paper.png
import paper from '../../../images/paper.png'
import addBtn2 from '../../../images/addBtn2.png'

export default function ProductosElegidosVentas({ productosElegidos, setCantidades, cantidades, setProductosElegidos }) {
    const [gatilloSumar, setGatilloSumar] = useState(false)
    const [editable, setEditable] = useState(0)

    return (
        <div>
            <SumarFormVentas productos={productosElegidos} gatillo={gatilloSumar} numero={cantidades} setNumero={setCantidades} id={editable} setGatillo={setGatilloSumar}/>
            <CortinaBlancaVentas gatillo={gatilloSumar} setGatillo={setGatilloSumar} />
            <ul className="text-center mb-4 xl:text-xl">
                <li key={'-1'} className={'font-serif flex flex-row my-3 mb-1 font-bold flex w-full py-1 text-xs md:text-lg xl:text-xl'}>
                    <div className="w-[10%]"></div>
                    <div className="flex flex-row justify-between items-center font-bold w-[80%]">
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

                        <li key={producto.id} className='border-4 shadow-md last:shadow-sm first:shadow-sm rounded font-serif flex flex-row py-6 xl:py-2 odd:bg-white even:bg-slate-100 last:border-b-4 border-b-0 w-full relative font-bold text-lg md:text-xl'>
                        {/* <li key={producto.id} className='border-b-2 mb-1 py-1 p-1 last:border-b-0 border-black last:mb-0 flex flex-row items-center justify-center text-sm'> */}


                            <button className="w-[10%]" onClick={
                                () => {
                                    // al hacer click en la X elimino el producto del array productosElegidos
                                    setProductosElegidos(productosElegidos.filter((prod) => prod.id !== producto.id))
                                    // elimino de cantidades el id y el valor de producto que eliminare
                                    delete cantidades[producto.id]
                                }
                            }>
                                <img src={paper} alt='paper' className="w-[50%] md:w-[40%] xl:w-[25%] mx-auto inline"/>
                            </button>
                            <div className="flex flex-row justify-between items-center w-[80%]">
                                <p className='w-[20%] break-words text-sm md:text-lg'>{producto.name}</p>
                                <p className='w-[20%]'>{producto.stock}</p>
                                <p className='w-[20%]'>${producto.price}</p>
                                <img src={producto.imagen} alt="producto" className='mx-auto px-2 max-h-[5vh] md:max-h-[12vh] max-w-[20%] xl:max-h-[10vh]' />
                                <p className='w-[20%]'>{
                                    // accedo al objeto cantidades con el id del producto de turno y muestro la cantidad aca
                                    cantidades[producto.id]
                                }</p>
                            </div>
                            <button onClick={() => {
                                setGatilloSumar(true)
                                setEditable(producto.id)
                            }} className="w-[10%]">
                                <img src={addBtn2} alt='addBtn' className="w-[50%] md:w-[40%] xl:w-[25%] mx-auto inline"/>
                            </button>
                        </li>
                    )
                }
                )}
            </ul>
        </div>
    )
}