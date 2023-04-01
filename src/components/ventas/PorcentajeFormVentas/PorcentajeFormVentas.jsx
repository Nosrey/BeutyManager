// importo lo necesario para el componente
import React, { useState, useEffect } from 'react';
// importo el css
import './PorcentajeFormVentas.css'

// creo un componente de react jsx
export default function PorcentajeFormVentas({ visible, setVisible, preciosLista, setPreciosLista, productoId, setProductoId }) {

    const [item, setItem] = useState({porcentaje: 100})

    
    const encontrarPrecioPorId = (id) => {
        let precio = preciosLista?.filter(precio => precio.id === id)
        return precio.length ? precio[0] : { id: 0, precio: 0, porcentaje: 0 }
    }
    // declaro el estado cantidad

    // creo la funcion handleInputChange para crear un formulario controlado con descuento
    const handleInputChange = (e) => {
        let valor = e.target.value
        if (valor[0] === '0' && valor.length > 1) {
            valor = valor.slice(1)
        }
        if (valor < 1) valor = 0;
        let copiaPrecios = [...preciosLista]
        preciosLista?.forEach(precio => {
            if (precio.id === productoId) {
                precio.porcentaje = valor
            }
        })
        // seteo el array precios con la copia modificada
        setPreciosLista(copiaPrecios)
    }

    // declaro un useEffect donde cada vez que visible cambie se ejecutara para actualizar el valor de item al del elemento en precios que tenga productoId
    useEffect(() => {
        setItem(encontrarPrecioPorId(productoId))
    }, [visible])

    // creo la funcion cerrar
    const cerrar = () => {
        setProductoId(0)
        // reviso si el elemento de precioLista con la id esta vacio para asignarlo a 0 entonces
        if (encontrarPrecioPorId(productoId).porcentaje === '' || encontrarPrecioPorId(productoId).porcentaje < 1) {
            let copiaPrecios = preciosLista.map(precio => {
                if (precio.id === productoId) {
                        precio.porcentaje = 100
                }
                return precio
            })        
            setPreciosLista(copiaPrecios)
        }
        setVisible(false)
    }


    // creo la funcion colorTexto que dice que si descuento es mayor a 100 el numero sera verde, si es menor a 100 sera rojo y si es igual a 100 sera negro, todo en tailwind, esta funcion retornara esos estilos en texto
    const colorTexto = () => {
        if (item.porcentaje > 100) {
            return 'text-green-500'
        }
        else if (!item.porcentaje.length) {
            return 'text-black'
        }
        else if (item.porcentaje < 100) {
            return 'text-red-500'
        }
        else {
            return 'text-black'
        }
    }

    return (
        <div className={visible ? 'z-20 py-8 fixed w-[50%] md:w-[30%] md:left-[35%] xl:w-[20%] xl:left-[40%] bg-white rounded border left-[25%] top-[35%] shadow-md flex items-center justify-center flex-col' : 'hidden'}>
            <button onClick={cerrar} className='close-button2'></button>

            <div class="relative w-[80%] flex flex-col items-center justify-center text-center">
                <label class="mb-4 text-gray-500 pointer-events-none labelsin text-xl">Tasa de precio</label>

                <input type="number" className="w-[70%] mb-4 text-center px-4 py-2 border rounded-md outline-none focus:border-blue-500 text-gray-400" placeholder="Tasa..." value={item?.porcentaje} onChange={(e) => handleInputChange(e)} />
                <h3 className={'font-bold text-4xl ' + colorTexto()}>{item.porcentaje?.length ? item.porcentaje : 100}%</h3>
            </div>
        </div>
    ) 
}