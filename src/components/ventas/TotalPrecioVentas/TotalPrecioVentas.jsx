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

function TotalPrecioVentas({ lista, cantidades, setLista, setCantidades, ip, setProductos }) {
    // creo los estados gatilloConfirmar
    const [gatilloConfirmar, setGatilloConfirmar] = useState(false)
    const [cargando, setCargando] = useState(false);

    // creo una funcion para calcular el total tomando en cuenta cuantos elementos se venderan en base a sus cantidades en cantidades
    const calcularTotal = (lista, cantidades) => {
        let total = 0;
        lista.forEach(element => {
            total += element.price * cantidades[element.id]
        });
        return total
    }

    // creo la funcion confirmarVentas donde si la variable lista esta vacia no sucede nada, pero si tiene almenos un elemento se activa a true la variable gatilloConfirmar
    const confirmarVentas = () => {
        if (lista.length > 0) {
            setGatilloConfirmar(true)
        }
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
            <div className="flex flex-col xl:flex-row items-center justify-around xl:justify-end mt-4 mb-4 xl:mb-0">
                <h1 className="text-xl font-bold xl:text-3xl">Total</h1>
                <h1 className="italic text-lg xl:text-2xl xl:ml-5 xl:mr-14 ">{'$' + calcularTotal(lista, cantidades)}</h1>
            </div>

            {/* <button onClick={confirmarVentas} className=' hover:bg-slate-50 text-lg flex flex-col items-center justify-center  bg-white border-2 shadow-sm rounded-xl hover:animate-pulse w-[35%] py-2 mx-auto xl:mx-0 my-4 xl:w-[20%] xl:text-3xl xl:ml-14 xl:mb-0'>
                <div className="flex flex-row items-center justify-center">
                    <h1 className='mr-2 inline text-black font-bold text-1xl'>Confirmar</h1>
                    <img className='inline rounded text-base xl:text-xl w-5 xl:w-7 xl:ml-2' src={confirm} alt='addBtn2' />
                </div>
            </button> */}


            <button class="xl:ml-14 xl:mb-0 text-center mt-4 w-[80%] xl:w-auto xl:mt-10 mx-auto" onClick={confirmarVentas} >
                <div class="flex-1 h-full w-auto mx-auto">
                    <div class="flex flex-row items-center justify-center  bg-white shadow-md border rounded-lg py-4 px-16">
                        <p class="m-auto inset-0 text-2xl font-semibold leading-7 text-center text-gray-800 xl:mr-6">Confirmar</p>
                        <div class="">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
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