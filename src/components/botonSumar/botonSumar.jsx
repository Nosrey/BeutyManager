//importo useState para un formulario controlado
import React, { useState, useEffect } from 'react';
// importo removeBtn de Home.jsx
import { removeBtn } from '../home/Home.jsx';
// lo mismo pero con addBtn2
import { addBtn2 } from '../home/Home.jsx';

function BotonSumar({ numeroASumar, setNumeroASumar, setGatilloSumar, precio, setPrecio, precioCompra, setPrecioCompra, stock, setStock, stockDeposito, setStockDeposito, gatilloSumar }) {
    // creo el estado para el numero a sumar
    const [numero, setNumero] = useState('');
    // creo el estado placeholder para recibir el valor del elemento a cambiar y colocarlo en el placeholder
    const [placeholder, setPlaceholder] = useState(0);
    // creo el estado para establecer el signo de suma o resta
    const [signo, setSigno] = useState("y");

    // creo la funcion cerrar
    const cerrar = () => {
        setGatilloSumar(false)
        setNumero('')
    }

    // creo la funcion handleSumSubmit que revisa el name de la variable numeroASumar.name y dependiendo del name ejecuta el set correspondiente de numeroASumar.value + numero
    const handleSumSubmit = () => {
        if (numeroASumar.signo === '+') {
            if (numeroASumar.name === 'precio') {
                setPrecio(Number(precio) + Number(numero))
            } else if (numeroASumar.name === 'precioCompra') {
                setPrecioCompra(Number(precioCompra) + Number(numero))
            } else if (numeroASumar.name === 'stock') {
                setStock(Number(stock) + Number(numero))
            } else if (numeroASumar.name === 'stockDeposito') {
                setStockDeposito(Number(stockDeposito) + Number(numero))
            }
            setNumeroASumar({ ...numeroASumar, value: Number(numeroASumar.value) + Number(numero) })
        }
        else if (numeroASumar.signo === "-") {
            // hago lo mismo que arriba pero en resta
            if (numeroASumar.name === 'precio') {
                setPrecio((Number(precio) - Number(numero) < 0) ? 0 : Number(precio) - Number(numero))
            } else if (numeroASumar.name === 'precioCompra') {
                setPrecioCompra((Number(precioCompra) - Number(numero) < 0) ? 0 : Number(precioCompra) - Number(numero))
            }
            else if (numeroASumar.name === 'stock') {
                setStock((Number(stock) - Number(numero) < 0) ? 0 : Number(stock) - Number(numero))
            }
            else if (numeroASumar.name === 'stockDeposito') {
                setStockDeposito((Number(stockDeposito) - Number(numero) < 0) ? 0 : Number(stockDeposito) - Number(numero))

            }
            setNumeroASumar({ ...numeroASumar, value: (Number(numeroASumar.value) - Number(numero) < 0) ? 0 : Number(numeroASumar.value) - Number(numero) })
        }
        cerrar()
    }

    // creo un useEffect que actualiza el estado signo cuando el valor de numeroASumar.signo cambia
    useEffect(() => {
        setSigno(numeroASumar.signo)
        setPlaceholder(numeroASumar.value)
        // eslint-disable-next-line
    }, [numeroASumar])

    return (
        <div className={(gatilloSumar) ? "flex flex-col items-center justify-center text-2xl w-[50%] left-[25%] xl:w-[20%] fixed top-[30%] xl:top-[25%] xl:left-[40%] z-30 bg-white border shadow text-center rounded-2xl p-1 xl:p-3 opacity-100 " : 'hidden'}>
            <div className='flex flex-col items-center justify-center '>
                <img className='w-[20%] mt-2 ' src={(signo === "+") ? addBtn2 : removeBtn} alt='signo'/>

                <input className='my-5 w-[30%] xl:w-[20%] py-1 border border-black border-2 rounded text-center font-bold text-4xl text-center text-blue-700' placeholder={placeholder} value={numero} onChange={(e) => setNumero(e.target.value)} />
            </div>
            <button onClick={handleSumSubmit} className="bg-blue-500 text-white px-3 font-semibold py-0.5 rounded-md shadow-sm xl:hover:animate-bounce italic p-1 mb-2">
                <h2 className=''>
                    {(signo === "+") ? 'Sumar' : 'Restar'}
                </h2>
            </button>
            <button className='font-serif bg-red-600 text-white absolute top-3 right-3 px-1.5 font-black hover:bg-red-300 text-3xl' onClick={cerrar}>X</button>
        </div>
    );
}

export default BotonSumar;