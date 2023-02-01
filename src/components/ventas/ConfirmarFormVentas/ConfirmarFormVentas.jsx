// importo connect, react, useEffect y lo necesario
import { connect } from "react-redux";
import cancel from '../../../images/cancel.png'
import confirm from '../../../images/confirm.png'
import PantallaCargaVentas from '../PantallaCargaVentas/PantallaCargaVentas'
// importo useState

function ConfirmarFormVentas({ gatillo, setGatillo, vender, calcularTotal, lista, cantidades, cargando, setCargando }) {
    // creo el estado cargando
    
    return (
        <div className={(gatillo) ? 'text-4xl rounded-xl w-[45%] left-[27.5%] md:w-[20%] md:left-[40%] xl:w-[20%] fixed top-[30%] xl:top-[20%] xl:left-[40%] z-30 md:top-[20%]' : 'hidden'}>
            <PantallaCargaVentas gatillo={cargando} />
            <form className="flex flex-col bg-white border shadow text-center rounded-2xl p-4 xl:p-6 xl:pt-3 pt-2 justify-center items-center ">
                <button type="button" onClick={() => setGatillo(false)} className='w-[12%] md:w-[12%] md:right-4 absolute right-3 top-0 xl:right-2 xl:top-1 xl:w-[10%]'>
                    <img src={cancel} alt='cancel-btn' className='shadow-sm xl:hover:animate-pulse inline w-[100%]' />
                </button>
                <label htmlFor="cantidad" className="w-[80%] md:w-[90%] mt-7 mb-2 text-2xl md:text-2xl xl:text-3xl italic text-stone-800">¿Confirmar Venta?</label>
                <h1 className="font-bold text-xl md:mb-2 mb-3">{'$' + calcularTotal(lista, cantidades)}</h1>
                <div className="flex flex-row justify-center items-center w-[35%] md:w-[30%] xl:w-[30%] xl:mt-2 mb-4">
                    <button type="button" onClick={() => {
                        setCargando(true);
                        vender();
                    }} >
                        <img src={confirm} alt='confirm-btn' className='shadow-sm xl:hover:animate-pulse inline w-[100%]' />
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