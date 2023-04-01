// creo un componente con stateToProps y dispatchToProps
import React from 'react';
import { connect } from "react-redux";

function CajaVentas({ precios, setPrecios, productosVentas, setProductosElegidos, setCantidades, cantidades, productosElegidos, setInput, setProductosVentas }) {
    return (
        <div className={productosVentas.length ? "w-full opacity-95 absolute top-0 bg-white rounded-b-xl z-10" : 'hidden'}>
            {/* creo una lista en ul de li elements donde cada li element es un producto de productosVentas */}
            <ul className=''>
                <li key={'-1'} className={productosVentas ? 'border-2 py-2 p-1 text-center shadow' : 'hidden'}>
                    <div className="flex flex-row justify-between items-center font-bold xl:text-xl">
                        <h1 className='w-[10%]'>#</h1>
                        <h1 className='w-[30%]'>Nombre</h1>
                        <h1 className='w-[20%]'>Stock</h1>
                        <h1 className='w-[20%]'>Precio</h1>
                        <h1 className='w-[20%]'>Img</h1>
                    </div>

                </li>
                {productosVentas?.map(producto => {
                    return (
                        <li key={producto.id} className='

                        border-2 shadow-md last:shadow-sm first:shadow-sm rounded rounded-t-none font-serif flex flex-row py-3 odd:bg-white even:bg-slate-100 last:border-b-4 border-b-0 w-full relative font-bold text-lg xl:text-2xl
                        '>
                            <button className='w-full' onClick={() => {
                                // reviso si en productosElegidos ya existe este producto en cuestion, si no existe lo agrego y en cantidades le asigno como valor 1 en base a su id, si ya existe entonces no lo agrego nuevamente si no que sumo 1 a la cantidad de su id en cantidades
                                const existencia = productosElegidos.filter(productoElegido => productoElegido.id === producto.id)
                                if (!existencia.length) {
                                    setProductosElegidos([...productosElegidos, producto])
                                    setCantidades({ ...cantidades, [producto.id]: 1 })
                                    setPrecios([...precios, { id: producto.id, precio: producto.price, porcentaje: 100 }])
                                } else {
                                    setCantidades({ ...cantidades, [producto.id]: cantidades[producto.id] + 1 })
                                }
                                setInput('')
                                setProductosVentas([])
                                
                            }}>

                                <div className="flex flex-row justify-between items-center">
                                    <p className='w-[10%]'>#{producto.id}</p>
                                    <p className='text-sm md:text-md xl:text-xl w-[30%]'>{producto.name}</p>
                                    <p className='w-[20%]'>{producto.stock}</p>
                                    <p className='w-[20%]'>${producto.price}</p>
                                    <img src={producto.imagen} alt="producto" className='mx-auto px-2 max-h-[5vh] max-w-[20%]' />
                                </div>
                            </button>

                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CajaVentas);

