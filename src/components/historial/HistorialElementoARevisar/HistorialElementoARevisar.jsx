import React, { useState, useEffect } from "react";
import cancel from '../../../images/cancel.png'

export default function HistorialElementoARevisar({ elementos, gatillo, setGatillo, fecha }) {
    // creo el estado para sumar todos los productos
    const [total, setTotal] = useState(0);

    // creo un useEffect para revisar elementos y sacar el total
    useEffect(() => {
        let total = 0;
        elementos.forEach(elemento => {
            total += elemento.price * elemento.numberOfProducts;
        });
        setTotal(total);
    }, [elementos]);

    return (
        <div className={gatillo ? "flex flex-col w-[95%] left-[2.5%] h-auto bg-slate-50 border-4 rounded-lg  z-30 fixed text-center text-sm shadow-lg" : 'hidden'}>
            <h1 className="my-2 mb-6 text-lg font-bold">{fecha}</h1>
            <button type="button" onClick={() => setGatillo(false)} className='w-[5%] absolute top-1 right-1 md:right-3  xl:right-2'>
                <img src={cancel} alt='cancel-btn' className='shadow-sm xl:hover:animate-pulse inline w-[100%]' />
            </button>
            <ul className="flex flex-col items-center justify-center w-full">
                <li className="flex flex-row justify-between items-center w-full border-b-2 pb-2 mb-0 font-bold px-2">
                    <h1 className="w-[10%]">Cod</h1>
                    <h1 className="w-[30%]">Nombre</h1>
                    <h1 className="w-[10%]">Nro</h1>
                    <h1 className="w-[10%]">Prc</h1>
                    <h1 className="w-[10%]">Total</h1>
                    <h1 className="w-[30%]">Img</h1>
                </li>
                {elementos.map((elemento) => {
                    return (
                        <li key={elemento.id} className='shadow-md last:shadow-sm first:shadow-sm rounded rounded-t-none font-serif flex flex-row py-2 even:bg-white odd:bg-slate-100 w-full relative font-bold text-lg xl:text-2xl px-2'>
                            <h1 className="w-[10%] text-sm my-auto">{elemento.id}</h1>
                            <h1 className="w-[30%] text-sm my-auto">{elemento.name}</h1>
                            <h1 className="w-[10%] text-sm my-auto text-center">{elemento.numberOfProducts}</h1>
                            <h1 className="w-[10%] text-sm my-auto text-center">${elemento.price}</h1>
                            <h1 className="w-[10%] text-sm my-auto text-center">${elemento.price * elemento.numberOfProducts}</h1>
                            <div className="w-[30%] my-auto">
                                <img className="mx-auto px-1 max-h-[5vh] max-w-[100%]" src={elemento.imagen} alt="producto" />
                            </div>
                        </li>
                    );
                })}
                <li>
                    <h1 className={"w-full text-center font-bold text-lg xl:text-2xl mt-6 mb-2"}>Total: ${total}</h1>
                </li>
            </ul>
        </div>
    )
}