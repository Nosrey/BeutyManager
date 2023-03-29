// importo connect, react, useEffect y lo necesario
import { connect } from "react-redux";
import cancel from '../../../images/cancel.png'
import PantallaCargaVentas from '../PantallaCargaVentas/PantallaCargaVentas'
// importo useState
import { useState } from 'react'

function ConfirmarFormVentas({ gatillo, setGatillo, vender, calcularTotal, lista, cantidades, cargando, setCargando }) {
    // creo el estado para el cambio
    const [cambio, setCambio] = useState(0)

    const calcularCambio = () => {
        if ((cambio - calcularTotal(lista, cantidades)) > 0) {
            return 'Cambio: $' + (cambio - calcularTotal(lista, cantidades)).toFixed(2)
        } else {
            return 'Cambio: $0'
        }
    }

    const handleCambioChange = (e) => {
        let valor = e.target.value
        // si el primer elemento es un 0 lo elimino
        if (valor[0] === '0') {
            if (valor[0] === '0' && valor.length > 1) valor = valor.slice(1)
        }
        setCambio(valor)
    }

    return (
        <div className={(gatillo) ? 'text-4xl rounded-xl w-[50%] left-[25%] md:w-[25%] md:left-[37.5%] xl:w-[20%] fixed top-[20%] xl:top-[20%] xl:left-[40%] z-30 md:top-[10%]' : 'hidden'}>
            <PantallaCargaVentas gatillo={cargando} />
            <form className="flex flex-col bg-white border shadow text-center rounded-2xl p-4 xl:p-6 xl:py-0 pt-2 justify-center items-center ">
                <button type="button" onClick={() => setGatillo(false)} className='w-[12%] md:w-[12%] md:right-4 absolute right-3 top-0 xl:right-2 xl:top-1 xl:w-[10%]'>
                    <img src={cancel} alt='cancel-btn' className='shadow-sm xl:hover:animate-pulse inline w-[100%]' />
                </button>
                <label htmlFor="cantidad" className="w-[80%] md:w-[90%] mt-4 mb-2 text-3xl md:text-3xl xl:text-4xl text-stone-800">Total</label>
                <h1 className="font-bold text-2xl md:mb-2 mb-3">{'$' + calcularTotal(lista, cantidades)}</h1>

                <label className="text-gray-400 text-xl mb-2 mt-4">Cambio</label>
                <input type="nunber" className="w-[70%] mb-4 text-center px-2 py-2 border rounded-md outline-none focus:border-blue-500 text-gray-400 text-xl" value={cambio} onChange={(e) => handleCambioChange(e)} />
                <p className={cambio > 0 ? "text-base italic text-gray-500" : "hidden"}>{calcularCambio()}</p>

                <div className="flex flex-row justify-center items-center w-[35%] md:w-[30%] xl:w-[30%] xl:mt-2 mb-4">
                    <button onClick={() => {
                        setCambio(0);
                        setCargando(true);
                        vender();
                    }} type="button" class="mt-2 text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                        <svg aria-hidden="true" class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                        Vender
                    </button>
                </div>
            </form>

        </div>
    )
}

// traigo productos de state
const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmarFormVentas)