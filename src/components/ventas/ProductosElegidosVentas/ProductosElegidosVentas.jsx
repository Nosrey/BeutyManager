import React from "react";

export default function ProductosElegidosVentas({ productosElegidos, setCantidades, cantidades }) {

    return (
        <div>
            <ul className="text-center">
                <li key={'-1'} className={'text-sm border-b-2 mb-1 py-1 p-1  last:border-b-0 border-black last:mb-0 text-center '}>
                    <div className="flex flex-row justify-between items-center font-bold bg-slate-50">
                        <h1 className='w-[20%]'>Nombre</h1>
                        <h1 className='w-[20%]'>Stock</h1>
                        <h1 className='w-[20%]'>Precio</h1>
                        <h1 className='w-[20%]'>Img</h1>
                        <h1 className='w-[20%]'>Cantidad</h1>
                    </div>

                </li>
                {productosElegidos?.map((producto) => {
                    return (
                        
                        <li key={producto.id} className='border-b-2 mb-1 py-1 p-1 last:border-b-0 border-black last:mb-0'>
                            <div className="flex flex-row justify-between items-center w-full">
                                <p className='w-[20%]'>{producto.name}</p>
                                <p className='w-[20%]'>{producto.stock}</p>
                                <p className='w-[20%]'>${producto.price}</p>
                                <img src={producto.imagen} alt="producto" className='mx-auto px-2 h-[5vh] max-w-[20%]' />
                                <p className='w-[20%]'>{
                                    // accedo al objeto cantidades con el id del producto de turno y muestro la cantidad aca
                                    cantidades[producto.id]
                                }</p>
                            </div>
                        </li>
                    )
                }
                )}
            </ul>
        </div>
    )
}