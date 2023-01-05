//importo useState para un formulario controlado
import React, { useState, useEffect } from 'react';

function BotonSumar({ numeroASumar, setNumeroASumar, setGatilloSumar, precio, setPrecio, precioCompra, setPrecioCompra, stock, setStock, stockDeposito, setStockDeposito }) {
    // creo el estado para el numero a sumar
    const [numero, setNumero] = useState(0);
    // creo el estado para establecer el signo de suma o resta
    const [signo, setSigno] = useState("+");

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
                setPrecio(Number(precio) - Number(numero))
            } else if (numeroASumar.name === 'precioCompra') {
                setPrecioCompra(Number(precioCompra) - Number(numero))
            }
            else if (numeroASumar.name === 'stock') {
                setStock(Number(stock) - Number(numero))
            }
            else if (numeroASumar.name === 'stockDeposito') {
                setStockDeposito(Number(stockDeposito) - Number(numero))
            }
            setNumeroASumar({ ...numeroASumar, value: Number(numeroASumar.value) - Number(numero) })
        }
    }

    // creo un useEffect que actualiza el estado signo cuando el valor de numeroASumar.signo cambia
    useEffect(() => {
        setSigno(numeroASumar.signo)
    }, [numeroASumar.signo])

    return (
        <div>
            <div>
                <h1>{numeroASumar.value}</h1>
                <input value={numero} onChange={(e) => setNumero(e.target.value)} />
            </div>
            <button onClick={handleSumSubmit}>{(signo === "+") ? "Sumar!" : "Restar!"}</button>
            <button onClick={() => setGatilloSumar(false)}>Cerrar</button>
        </div>
    );
}

export default BotonSumar;