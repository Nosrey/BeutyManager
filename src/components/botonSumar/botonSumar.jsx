// importo el css
import './botonSumar.css';
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

    // creo una funcion para sumar en 1 el valor correspondiente o restar
    const sumar = () => {
        if (numeroASumar.signo === '+') {
            if (numeroASumar.name === 'precio') {
                setPrecio(Number(precio) + 1)
            } else if (numeroASumar.name === 'precioCompra') {
                setPrecioCompra(Number(precioCompra) + 1)
            } else if (numeroASumar.name === 'stock') {
                setStock(Number(stock) + 1)
            } else if (numeroASumar.name === 'stockDeposito') {
                setStockDeposito(Number(stockDeposito) + 1)
            }
            setNumeroASumar({ ...numeroASumar, value: Number(numeroASumar.value) + 1 })
        }
        else if (numeroASumar.signo === "-") {
            // hago lo mismo que arriba pero en resta
            if (numeroASumar.name === 'precio') {
                setPrecio((Number(precio) - 1 < 0) ? 0 : Number(precio) - 1)
            } else if (numeroASumar.name === 'precioCompra') {
                setPrecioCompra((Number(precioCompra) - 1 < 0) ? 0 : Number(precioCompra) - 1)
            }
            else if (numeroASumar.name === 'stock') {
                setStock((Number(stock) - 1 < 0) ? 0 : Number(stock) - 1)
            }
            else if (numeroASumar.name === 'stockDeposito') {
                setStockDeposito((Number(stockDeposito) - 1 < 0) ? 0 : Number(stockDeposito) - 1)
            }
            setNumeroASumar({ ...numeroASumar, value: (Number(numeroASumar.value) - 1 < 0) ? 0 : Number(numeroASumar.value) - 1 })
        }
    }


    // creo un useEffect que actualiza el estado signo cuando el valor de numeroASumar.signo cambia
    useEffect(() => {
        setSigno(numeroASumar.signo)
        setPlaceholder(numeroASumar.value)
        // eslint-disable-next-line
    }, [numeroASumar])

    // creo un useEffect para cuando numeri cambie, si el valor escrito no es un numero entonces este cambia a 0
    useEffect(() => {
        // reviso numero a numero el valor de la constante numero, si alguno de esos valores no es un numero lo elimino, por ejemplo si esta escrito 051 y luego cambia a "051a" la ultima "a" unicamente es la eliminada
        let numeroEditable = numero
        for (let i = 0; i < numero.length; i++) {
            if (isNaN(numero[i])) {
                numeroEditable = numeroEditable.replace(numero[i], '')
            }
        }
        // ahora si numeroEditable es un numero entonces lo asigno a numero
        if (!isNaN(numeroEditable)) {
            setNumero(numeroEditable)
        } else {
            setNumero(0)
        }

    }, [numero])

    return (
        <div className={(gatilloSumar) ? "flex flex-col items-center justify-center text-2xl w-[50%] md:top-[20%] md:w-[30%] md:left-[35%] left-[25%] xl:w-[20%] fixed top-[30%] xl:top-[25%] xl:left-[40%] z-30 bg-white border shadow text-center rounded-2xl p-1 xl:p-3 opacity-100 " : 'hidden'}>
            <div className='flex flex-col items-center justify-center '>
                <button className={'w-[20%] md:w-[25%] mt-2 '} onClick={sumar}>

                    <img className='w-[100%] mt-2 ' src={(signo === "+") ? addBtn2 : removeBtn} alt='signo' />
                </button>

                <input className='my-5 w-[50%] md:w-[40%] xl:w-[40%] py-1 border border-black border-2 rounded text-center font-bold text-4xl text-center text-blue-700' placeholder={placeholder} value={numero} onChange={(e) => setNumero(e.target.value)} />
            </div>

            {/* <button onClick={handleSumSubmit} className="bg-blue-500 text-white px-3 font-semibold py-0.5 rounded-md shadow-sm xl:hover:animate-bounce italic p-1 mb-2">
                <h2 className=''>
                    {(signo === "+") ? 'Sumar' : 'Restar'}
                </h2>
            </button> */}

            <button class="text-center w-[90%] md:w-[80%] mx-auto mb-4" onClick={handleSumSubmit} >
                <div class="flex-1 h-full w-auto mx-auto">
                    <div class="flex flex-row items-center justify-center  bg-white shadow-md border rounded-lg py-4 px-16">
                        <p class="m-auto inset-0 text-lg md:text-2xl font-semibold leading-7 text-center text-gray-800 mr-2 md:mr-6">Confirmar</p>
                        <div class="">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </button>

            <button className='font-serif bg-red-600 text-white absolute top-3 right-3 px-1.5 font-black hover:bg-red-300 text-3xl' onClick={cerrar}>X</button>
        </div>
    );
}

export default BotonSumar;