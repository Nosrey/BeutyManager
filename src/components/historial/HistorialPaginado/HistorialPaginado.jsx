import arrowRight from '../../../images/arrowRight.png';
import arrowLeft from '../../../images/arrowLeft.png';

export default function HistorialPaginado({ pagina, setPagina, historial, elementosPorPagina }) {
    const cambiarPagina = (direccion) => {
        if (direccion === "+") {
            // seteo la pagina a la que se va a ir, si la pagina actual multiplicada por elementosPorPagina es mayor o igual a la longitud del historial, entonces se va a ir a la ultima pagina, sino se va a ir a la pagina actual + 1
            setPagina(((pagina + 1) * elementosPorPagina >= historial.length) ? Math.floor(historial.length / elementosPorPagina) : pagina + 1);
        } else {
            // seteo la pagina a la que se va a retroceder, si la pagina actual es 0, entonces se va a ir a la primera pagina, sino se va a ir a la pagina actual - 1
            setPagina((pagina === 0) ? 0 : pagina - 1);
        }
    }
    return (
        <div className="flex flex-row justify-center items-center my-2">
            <button className="w-[10%] md:w-[5%] xl:w-[3.5%]" onClick={() => cambiarPagina("-")}>
                <img src={arrowLeft} alt='arrowLeft' className='' />
            </button>
            <h1 className='inline mx-5 border px-3 font-bold text-2xl text-center border-black border-2 rounded-md'>{pagina + 1}</h1>
            <button className='w-[10%] md:w-[5%] xl:w-[3.5%]' onClick={() => cambiarPagina("+")}>
                <img src={arrowRight} alt='rightArrow' className='' />
            </button>
        </div>
    )
}