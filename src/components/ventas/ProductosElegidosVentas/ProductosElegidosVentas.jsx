import React from "react";
import { useState, useEffect } from "react";
import CortinaBlancaVentas from "../CortinaBlancaVentas/CortinaBlancaVentas";
import SumarFormVentas from "../SumarFormVentas/SumarFormVentas";
// importo la imagen paper.png
import paper from '../../../images/paper.png'
import addBtn2 from '../../../images/addBtn2.png'
import percentage from '../../../images/percentage.png'
// importo el css
import './ProductosElegidosVentas.css'

// importo coonect
import { connect } from "react-redux";

function ProductosElegidosVentas({ productosElegidos, setCantidades, cantidades, setProductosElegidos, productos, precios, setPrecios }) {
    const [gatilloSumar, setGatilloSumar] = useState(false)
    const [editable, setEditable] = useState(0)

    // creo un useEffect donde si cambia productosElegidos entonces tomo el precio de cada uno y lo asigno a un objeto con su id:precio
    useEffect(() => {
        if (productosElegidos.length) {
            let precios = []
            productosElegidos.forEach(producto => {
                precios.push({ id: producto.id, precio: producto.price })
            })
            setPrecios(precios)
        }
        // eslint-disable-next-line
    }, [productosElegidos])

    // una funcion llamada encontrarPrecio que ubica en base a la id recibida
    const encontrarPrecio = (id) => {
        if (precios.length) {
            let final = precios.filter(precio => precio.id === id)
            if (final.length) return final[0].precio
            else return 0
        }
        else return 0
    }


    return (
        <div>
            <SumarFormVentas productosLista={productosElegidos} gatillo={gatilloSumar} numero={cantidades} setNumero={setCantidades} id={editable} setGatillo={setGatilloSumar} />
            <CortinaBlancaVentas gatillo={gatilloSumar} setGatillo={setGatilloSumar} />
            <ul className="text-center mb-4 xl:text-xl">
                <li key={'-1'} className={'font-serif flex flex-row my-3 mb-1 font-bold flex w-full py-1 text-xs md:text-lg xl:text-xl'}>
                    <div className="w-[10%]"></div>
                    <div className="flex flex-row justify-between items-center font-bold w-[80%]">
                        <h1 className='w-[20%]'>Nombre</h1>
                        <h1 className='w-[20%]'>Stock</h1>
                        <h1 className='w-[10%]'>Ctd</h1>
                        <h1 className='w-[20%]'>Img</h1>
                        <h1 className='w-[30%]'>Precio</h1>
                    </div>
                    <div className="w-[10%]"></div>


                </li>
                {!productosElegidos.length ?
                    <li className='w-full flex flex-col items-center justify-center mt-12 md:mt-6 italic'>
                        <h1 className='font-serif text-4xl mx-auto font-bold  block mt-0'>Sin productos</h1>
                        <img className="w-[100%] md:w-[70%] xl:w-1/2 mt-4 bottom-1" src="https://chryslergroup.navigation.com/static/WFS/Shop-Site/-/Shop/en_US/Product%20Not%20Found.png" alt="notFound" />
                    </li>
                    : productosElegidos.map((producto, i) => {
                        return (

                            <li key={producto.id} className='border-4 shadow-md last:shadow-sm first:shadow-sm rounded font-serif flex flex-row py-6 xl:py-2 odd:bg-white even:bg-slate-100 last:border-b-4 border-b-0 w-full relative font-bold text-lg md:text-xl'>
                                {/* <li key={producto.id} className='border-b-2 mb-1 py-1 p-1 last:border-b-0 border-black last:mb-0 flex flex-row items-center justify-center text-sm'> */}


                                <button className="w-[10%]" onClick={
                                    () => {
                                        // al hacer click en la X elimino el producto del array productosElegidos  
                                        setProductosElegidos(productosElegidos.filter((prod) => prod.id !== producto.id))
                                        // elimino de cantidades el id y el valor de producto que eliminare
                                        delete cantidades[producto.id]
                                        console.log('soy productosElegidos', productosElegidos)
                                    }
                                }>
                                    <img src={paper} alt='paper' className="w-[50%] md:w-[40%] xl:w-[25%] mx-auto inline" />
                                </button>
                                <div className="flex flex-row justify-between items-center w-[80%]">
                                    <p className='w-[20%] break-words text-xs md:text-lg'>{producto.name}</p>
                                    <p className='w-[20%] text-sm md:text-lg'>{producto.stock}</p>
                                    <p className='w-[10%] text-sm md:text-lg'>{
                                        // accedo al objeto cantidades con el id del producto de turno y muestro la cantidad aca
                                        cantidades[producto.id]
                                    }</p>
                                    <img src={producto.imagen} alt="producto" className='mx-auto px-2 max-h-[5vh] md:max-h-[12vh] max-w-[20%] xl:max-h-[10vh]' />
                                    <div className="flex flex-row justify-center items-center text-center w-[30%]">
                                        <input className="border-2 text-xs py-1 md:text-lg xl:text-xl xl:py-0 text-center w-[60%] md:w-[35%] xl:w-[30%] rounded mx-1 md:mx-2" type="number" value={encontrarPrecio(producto.id)} onChange={(e) => {
                                            // al cambiar el precio del producto debo cambiar el precio en el array precios
                                            // primero creo una copia del array precios
                                            let valor = e.target.value
                                            // si el primer elememto es un 0 y tiene mas de 1 elementos lo elimino
                                            if (valor[0] === '0' && valor.length > 1) valor = valor.slice(1)
                                            let copiaPrecios = [...precios]
                                            // busco el precio con el id del producto de turno y lo reemplazo por el nuevo precio
                                            copiaPrecios.forEach(precio => {
                                                if (precio.id === producto.id) precio.precio = valor
                                            })
                                            // seteo el array precios con la copia modificada
                                            setPrecios(copiaPrecios)
                                        }
                                        } />
                                        <button type="button" className="w-[25%] md:w-[13%] xl:w-[9%]">
                                            <img src={percentage} alt="percentage" className="w-full" />
                                        </button>
                                    </div>
                                </div>
                                <button onClick={() => {
                                    setGatilloSumar(true)
                                    setEditable(producto.id)
                                }} className="w-[10%]">
                                    <img src={addBtn2} alt='addBtn' className="w-[50%] md:w-[40%] xl:w-[25%] mx-auto inline" />
                                </button>
                            </li>
                        )
                    }
                    )}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productos: state.productos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductosElegidosVentas)