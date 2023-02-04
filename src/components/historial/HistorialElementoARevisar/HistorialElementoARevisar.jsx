import React from "react";

export default function HistorialElementoARevisar({ elementos, gatillo, setGatillo, fecha }) {
    return (
        <div className={gatillo? "flex flex-col w-[90%] left-[5%] h-auto bg-slate-50 border rounded-lg shadow-lg p-4 z-30 fixed text-center p-2" : 'hidden'}>
            <h1>{fecha}</h1>
            <ul className="flex flex-col items-center justify-center w-full">
                <li className="flex flex-row justify-between items-center">
                    <h1>#</h1>
                    <h1>Nombre</h1>
                    <h1>Cantidad</h1>
                    <h1>Precio</h1>
                    <h1>Total</h1>
                    <h1>Img</h1>
                </li>
                {elementos.map((elemento) => {
                    return (
                        <li key={elemento.id} className="flex flex-row justify-between items-center">
                            <h1>{elemento.id}</h1>
                            <p>{elemento.name}</p>
                            <p>{elemento.price}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}