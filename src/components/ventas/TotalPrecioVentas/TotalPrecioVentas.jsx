// importo el css
import './TotalPrecioVentas.css'
import Axios from "axios";
// importare connect y luego creare las funciones mapstatetoprops y statetoprops para aplicar el connect
import { connect } from "react-redux";
// importo setProductos de las acciones
import { setProductos } from '../../../actions/index'
// importo cortinaBlancaVentas
import CortinaBlancaVentas from '../CortinaBlancaVentas/CortinaBlancaVentas'
import ConfirmarFormVentas from '../ConfirmarFormVentas/ConfirmarFormVentas'
// import useState
import { useState } from 'react'

// importo la imagen tasa.png
import tasa from '../../../images/tasa.png'

function TotalPrecioVentas({ lista, cantidades, setLista, setCantidades, ip, setProductos, setFondoBlancoDescuento, fondoBlancoDescuento, descuento, setDescuento, precios, setPrecios }) {
    // creo los estados gatilloConfirmar
    const [gatilloConfirmar, setGatilloConfirmar] = useState(false)
    const [cargando, setCargando] = useState(false);

    // creo una funcion para calcular el total tomando en cuenta cuantos elementos se venderan en base a sus cantidades en cantidades
    const calcularTotal = (lista, cantidades) => {
        let total = 0;
        precios.forEach(element => {
            total += element.precio * cantidades[element.id]
        });
        // aplico la tasa de descuento o incremento, si es 100 el precio es igual, pero si es 90 se tomara el 90% del precio por ejemplo, pero si descuento es igual a 0 entonces no aplico el cambio
        if (descuento !== 0) {
            total = total * (descuento / 100)
            // me aseguro de que total no tenga mas de 2 decimales
            total = total.toFixed(2)
        }

        return total
    }

    // creo la funcion colorTexto que dice que si descuento es mayor a 100 el numero sera verde, si es menor a 100 sera rojo y si es igual a 100 sera negro, todo en tailwind, esta funcion retornara esos estilos en texto
    const colorTexto = () => {
        if (descuento > 100) {
            return 'text-green-600'
        } else if (descuento < 100) {
            return 'text-red-600'
        } else {
            return 'text-black'
        }
    }

    const anchoSinDescuento = () => {
        // eslint-disable-next-line
        if (descuento == 100) {
            return " xl:w-[60%]"
        }
        else {
            return ''
        }
    }
    // creo la funcion confirmarVentas donde si la variable lista esta vacia no sucede nada, pero si tiene almenos un elemento se activa a true la variable gatilloConfirmar
    const confirmarVentas = () => {
        if (lista.length > 0) {
            setGatilloConfirmar(true)
        }
    }

    // funcion llamada activarDescuentos que activa la cortina blanca
    const activarDescuentos = () => {
        setFondoBlancoDescuento(true)
    }


    const vender = () => {
        // creo un array donde solo tendre las ids de lo que hay en lista
        let listaIds = [];
        lista.forEach(element => {
            listaIds.push(Number(element.id))
        });
        // creo un array de objetos donde estaran los objetos de lista pero el parametro lista.stock de cada uno sera reemplazado con el valor de cantidades que tiene la id de ese objeto
        let productData = [];
        lista.forEach(element => {
            // pusheo en productData todo el valor de el elemento pero cambiando su .stock por el de cantidades menos su stock original
            productData.push({ ...element, stock: element.stock - cantidades[element.id] })
        });
        console.log('soy lo que enviaras: ', { ids: listaIds, cambios: productData })
        Axios.put(ip + '/products/array', { ids: listaIds, cambios: productData })
            .then(() => setProductos()) // para pedir los productos actualizados
            .then(() => {
                setLista([]);
                setCantidades({});
                setGatilloConfirmar(false)
            })
            // luego hago un nuevo post a /histories con un array con de objetos de cada producto que se vendio, cada objeto tendra su "id", "name", "numberOfProducts" y "price" tambien tendra un "date" que sera la fecha actual en formato ISO-8601 y un valor de status que sera "complete" por default
            .then(() => {
                let historyData = [];
                lista.forEach(element => {
                    historyData.push({ id: element.id, name: element.name, numberOfProducts: cantidades[element.id], price: element.price, imagen: element.imagen })
                });
                let newHistory = {
                    products: historyData,
                    date: new Date().toISOString(),
                    status: 'complete'
                }
                console.log('soy lo que enviare a /histories: ', newHistory)
                return Axios.post(ip + '/histories', newHistory)
            })
            .then(() => {
                setCargando(false);
            })

            .catch((err) => {
                console.log('sucedio un error: ', err.response.data);
            })

    }
    return (
        <div className="flex flex-col xl:flex-row-reverse xl:justify-between">
            <CortinaBlancaVentas gatillo={gatilloConfirmar} setGatillo={setGatilloConfirmar} />
            <ConfirmarFormVentas gatillo={gatilloConfirmar} setGatillo={setGatilloConfirmar} vender={vender} calcularTotal={calcularTotal} lista={lista} cantidades={cantidades} cargando={cargando} setCargando={setCargando} />
            <div className="flex flex-col xl:flex-row items-center justify-around xl:justify-end mt-4 mb-4 xl:mb-0 relative">
                <div className='flex flex-col justify-center xl:justify-end items-center xl:w-[30%] xl:mr-6'>
                    <h1 className="text-2xl font-bold xl:text-3xl text-center">Total</h1>
                    <div className='inline flex flex-row items-center justify-center'>
                        <h1 className={"italic text-lg xl:text-2xl xl:ml-2 md:mr-1 mr-2 xl:mr-2 " + colorTexto()}>{'$' + calcularTotal(lista, cantidades)}</h1>
                        {/* eslint-disable-next-line */}
                        <img src={tasa} alt="tasa" className={descuento == 100 ? 'hidden' : 'inline h-auto w-[4%] md:w-[3%] xl:w-[10%] xl:mr-0'} />
                    </div>
                    {/* eslint-disable-next-line */}
                    <p className={(descuento == 100) ? 'hidden' : 'inline text-gray-500 xl:mx-2 my-2 xl:my-0 '}>{`(Usando el ${descuento}% del precio)`}</p>
                </div>
                <button className={`button-6 mt-2 xl:mt-0 xl:mr-14` + anchoSinDescuento()} type="button" onClick={activarDescuentos}>Tasa de precio</button>
            </div>

            <button type='button'
                className='flex break-inside xl:ml-14 xl:mb-8  text-2xl text-center mt-4 w-auto xl:mt-10 mx-auto text-center  rounded-3xl px-6 py-4 mb-4  bg-slate-700 font-bold text-white' onClick={confirmarVentas}>
                <div class='flex items-center justify-between flex-1'>
                    <span class='font-medium text-white mr-4'>Confirmar</span>
                    <svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path fillRule='evenodd' clipRule='evenodd'
                            d='M0 8.71423C0 8.47852 0.094421 8.25246 0.262491 8.08578C0.430562 7.91911 0.658514 7.82547 0.896201 7.82547H13.9388L8.29808 2.23337C8.12979 2.06648 8.03525 1.84013 8.03525 1.60412C8.03525 1.36811 8.12979 1.14176 8.29808 0.974875C8.46636 0.807989 8.6946 0.714233 8.93259 0.714233C9.17057 0.714233 9.39882 0.807989 9.5671 0.974875L16.7367 8.08499C16.8202 8.16755 16.8864 8.26562 16.9316 8.3736C16.9767 8.48158 17 8.59733 17 8.71423C17 8.83114 16.9767 8.94689 16.9316 9.05487C16.8864 9.16284 16.8202 9.26092 16.7367 9.34348L9.5671 16.4536C9.39882 16.6205 9.17057 16.7142 8.93259 16.7142C8.6946 16.7142 8.46636 16.6205 8.29808 16.4536C8.12979 16.2867 8.03525 16.0604 8.03525 15.8243C8.03525 15.5883 8.12979 15.362 8.29808 15.1951L13.9388 9.603H0.896201C0.658514 9.603 0.430562 9.50936 0.262491 9.34268C0.094421 9.17601 0 8.94995 0 8.71423Z'
                            fill='white' />
                    </svg>
                </div>
            </button>




        </div>
    )
}

const mapStateToProps = (state) => {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setProductos: (input, lista) => dispatch(setProductos(input, lista))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalPrecioVentas);

