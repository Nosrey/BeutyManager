// importo el archivo css
import './OpcionesMobile.css';

import { ipRuta } from '../../App';

function OpcionesMobile({ gatilloOpciones, setGatilloOpciones }) {
    return (
        <div className={(gatilloOpciones) ? " w-screen mobileOptions1 z-10 xl:hidden" : "xl:hidden w-screen mobileOptions2 z-10"}>
            <ul className='bg-black/60 text-white p-1 text-xl rounded-md rounded-t-none xl:hidden'>
                <li className='border-l-2 px-2  pl-3 pr-2 py-1 '>
                    <button onClick={
                        () => {
                            window.location.href = ipRuta + '/ventas'
                        }
                    }>Ventas</button>
                </li>
                <li className='ml-1 border-l-2 px-3 pr-2 pb-1 shadow-xl font-bold text-2xl not-italic  py-1'>
                    <h1>Inventario</h1>
                </li>
                <li className='border-l-2 px-2  pl-3 pr-2  py-1 shadow-md shadow-t-none '>
                    <h1>Inicio</h1>
                </li>
                <li className='border-l-2 px-2  pl-3 pr-2 py-1 shadow-md shadow-t-none '>
                    <h1>Autor</h1>
                </li>
            </ul>
        </div>
    );
}

export default OpcionesMobile;