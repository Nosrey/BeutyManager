// importo lo necesario para el componente
import React from 'react';
// importo el css
import './VentanaDescuentosVentas.css'

// creo un componente de react jsx
export default function VentanaDescuentosVentas({ visible, setVisible, descuento, setDescuento }) {
    // declaro el estado cantidad

    // creo la funcion handleInputChange para crear un formulario controlado con descuento
    const handleInputChange = (e) => {
        // creo una variable para guardar el valor del input
        let valor = e.target.value;

        // reviso si el primer elemento del string es un 0, de ser asi entonces lo elimino
        if (valor[0] === '0' && valor.length > 1) {
            valor = valor.slice(1)
        }
        if (valor < 1) valor = 0;
        setDescuento(valor)
    }

    // creo la funcion cerrar
    const cerrar = () => {
        setVisible(false)
        // reviso si la variable descuento.length es igual a 0, si lo es entonces establezco el valor de descuento a 0 para evitar quede vacio
        if (descuento.length === 0) {
            setDescuento(100)
        }
    }

    // creo la funcion colorTexto que dice que si descuento es mayor a 100 el numero sera verde, si es menor a 100 sera rojo y si es igual a 100 sera negro, todo en tailwind, esta funcion retornara esos estilos en texto
    const colorTexto = () => {
        if (descuento > 100) {
            return 'text-green-500'
        } 
        else if (!descuento.length) {
            return 'text-black'
        }
        else if (descuento < 100) {
            return 'text-red-500'
        } else {
            return 'text-black'
        }
    }

    return (
        <div className={visible ? 'z-10 py-8 fixed w-[50%] md:w-[30%] md:left-[35%] xl:w-[20%] xl:left-[40%] bg-white rounded border left-[25%] top-[35%] shadow-md flex items-center justify-center flex-col' : 'hidden'}>
            <button onClick={cerrar} className='close-button'></button>

            <div class="relative w-[80%] flex flex-col items-center justify-center text-center">
                <label class="mb-4 text-gray-500 pointer-events-none labelsin text-xl">Tasa de precio</label>

                <input type="number" className="w-[70%] mb-4 text-center px-4 py-2 border rounded-md outline-none focus:border-blue-500 text-gray-400" placeholder="Tasa..." value={descuento} onChange={(e) => handleInputChange(e)} />
                <h3 className={'font-bold text-4xl ' + colorTexto()}>{descuento.length ? descuento : 100}%</h3>

            </div>
        </div>
    )
}