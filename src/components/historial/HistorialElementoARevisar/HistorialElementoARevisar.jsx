import React, { useState, useEffect } from "react";
import cancel from '../../../images/cancel.png'
import { connect } from "react-redux";
import { setProductos } from "../../../actions/index";
import { ip } from '../..//home/Home'
import Axios from "axios";

function HistorialElementoARevisar({ elementos, gatillo, setGatillo, fecha, productos, setProductos, setCargando, id, setHistorial, index, historial }) {
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

    // ejecuto un useEffect para usar setProductos en caso de que en productos no haya nada
    useEffect(() => {
        if (productos.length === 0) {
            setProductos();
        }
        // eslint-disable-next-line
    }, []);

    // funcion que encuentra un elemento cuya id sea igual a la otorgada dentro de historial
    const encontrarElemento = (id, array) => {
        if (array.length) {

            let elemento = array.find(elemento => elemento.id === id);
            return elemento;
        } else {
            return null;
        }
    }


    // creo una funcion que busca en productos los productos dentro de elementos y les agrega a su stock la cantidad de productos vendidos
    const deshacerVenta = () => {
        if (encontrarElemento(id, historial)?.status === 'complete') {
            setCargando(true);
            // creo un array para guardar los productos que voy a modificar
            let productosModificados = [];
            let listaIds = []
            // recorro los elementos
            elementos.forEach(elemento => {
                // busco el producto en productos
                let producto = productos.find(producto => producto.id === elemento.id);
                // le sumo al stock la cantidad de productos vendidos
                producto.stock = Number(producto.stock) + Number(elemento.numberOfProducts);
                // agrego el producto modificado al array
                productosModificados.push(producto);
                listaIds.push(producto.id)
            });
            // envio un put a ip/products/array con los productos modificados
            Axios.put(ip + '/products/array', { cambios: productosModificados, ids: listaIds })
                // hago un .then y voy a ip/histories/id para cambiar el status
                .then(() => {
                    Axios.put(`${ip}/histories/${id}`)
                        .then(data => {
                            // si la respuesta es correcta, ejecuto setProductos con los productos modificados
                            setProductos();
                            setCargando(false)
                        })
                })
                .then(() => {
                    // uso setHistorial en base a que la posiscion del elemento de historial recibida sea igual a la variable index para cambiar el status a cancelled buscando en el array la coincidencia con dicha id
                    setHistorial(historial => {
                        let historialModificado = historial;
                        encontrarElemento(id, historialModificado).status = 'cancelled';
                        return historialModificado;
                    })
                    setGatillo(false)
                })

                .catch(error => {
                    console.log(error);
                    setCargando(false)
                });
        }
    }

    return (
        <div className={gatillo ? "overflow-y-auto flex flex-col w-[95%] left-[2.5%] md:w-[90%] md:left-[5%] top-[20%] md:top-[10%] xl:w-[85%] xl:left-[7.5%] md:max-h-[80vh] max-h-[60vh]  h-auto bg-slate-50 border-4 rounded-lg  z-30 fixed text-center text-sm shadow-lg" : 'hidden'}>
            <h1 className="my-2 mb-6 text-lg font-bold md:text-2xl xl:text-3xl">{fecha}</h1>
            <button type="button" onClick={() => setGatillo(false)} className='w-[5%] md:w-[3.5%] absolute top-1 right-1 md:right-2  xl:right-2'>
                <img src={cancel} alt='cancel-btn' className='shadow-sm xl:hover:animate-pulse inline w-[100%]' />
            </button>
            <ul className="flex flex-col items-center justify-center w-full md:text-lg xl:text-2xl">
                <li className="flex flex-row justify-between items-center w-full border-b-2 pb-2 mb-0 font-bold px-2">
                    <h1 className="w-[10%]">Cod</h1>
                    <h1 className="w-[30%]">Nombre</h1>
                    <h1 className="w-[10%]">Nro</h1>
                    <h1 className="w-[15%]">Prc</h1>
                    <h1 className="w-[15%]">Total</h1>
                    <h1 className="w-[20%]">Img</h1>
                </li>
                {elementos.map((elemento) => {
                    return (
                        <li key={elemento.id} className='shadow-md last:shadow-sm first:shadow-sm rounded rounded-t-none font-serif flex flex-row py-2 even:bg-white odd:bg-slate-100 w-full relative font-bold text-xs md:text-base xl:text-2xl px-2'>
                            <h1 className="w-[10%] my-auto">{elemento.id}</h1>
                            <h1 className="w-[30%] my-auto">{elemento.name}</h1>
                            <h1 className="w-[10%] my-auto text-center">{elemento.numberOfProducts}</h1>
                            <h1 className="w-[15%] my-auto text-center">${elemento.price}</h1>
                            <h1 className="w-[15%] my-auto text-center">${elemento.price * elemento.numberOfProducts}</h1>
                            <div className="w-[20%] my-auto">
                                <img className="mx-auto px-1 max-h-[5vh] xl:max-h-[10vh] md:max-h-[12vh] max-w-[100%]" src={elemento.imagen} alt="producto" />
                            </div>
                        </li>
                    );
                })}
                <li>
                    <h1 className={"w-full text-center font-bold text-lg md:text-xl xl:text-2xl mt-4 mb-3 md:mb-4"}>Total: ${total}</h1>
                </li>
            </ul>
            <button onClick={deshacerVenta} className={"bg-red-500 text-white font-bold w-[35%] md:w-[25%] xl:w-[20%] py-2 md:py-2 md:text-xl mx-auto rounded-md mb-4 text-base" + ((encontrarElemento(id, historial)?.status === 'cancelled') ? ' bg-gray-400 ' : '')}>Deshacer venta</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProductos: (input, orden) => dispatch(setProductos(input, orden)),
    }
}

const mapStateToProps = (state) => {
    return {
        productos: state.productos
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistorialElementoARevisar);