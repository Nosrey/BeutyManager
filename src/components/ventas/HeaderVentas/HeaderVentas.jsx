// importo ipRuta de Home
import React from 'react'
import { ipRuta } from '../../../App'
// importo la imagen bg-ventas.jpg
import bannerVentas from '../../../images/bg-ventas.jpg'
import bannerVentas2 from '../../../images/bg-ventas2.jpg'
import bannerVentas3 from '../../../images/bg-ventas3.jpg'
import boton3bars from '../../../images/boton3bars.png'
import OpcionesMobileVentas from '../OpcionesMobileVentas/OpcionesMobileVentas.jsx'

export default function HeaderVentas() {

    // Creo el estado gatilloOpciones y setGatilloOpciones
    const [gatilloOpcionesVentas, setGatilloOpcionesVentas] = React.useState(false)

    return (
        <div className={"min-h-[20vh] md:min-h-[40vh] xl:min-h-[25vh] xl:h-[60vh] bg-emerald-900 xl:flex-row items-center xl:justify-between  py-0 pt-0 xl:pt-0 bg-[length:100vw_auto] md:bg-[length:auto_100vh] bg-[length:auto_25vh] md:bg-[length:100%_auto] xl:bg-[length:100vw_auto] bg-[position:center_center] xl:bg-[position:center_0%] xl:bg-contain md:bg-top bg-fixed  shadow-md md:rounded-xl md:rounded-t-none bg-[url(" + bannerVentas3 + ")] xl:bg-[url(" + bannerVentas + ")]"}>

            <div>
                <div className='xl:hidden flex flex-col justify-center items-center'>
                    <OpcionesMobileVentas gatilloOpcionesVentas={gatilloOpcionesVentas} setGatilloOpcionesVentas={setGatilloOpcionesVentas} />
                    <button className='w-[8vw] md:w-[5vw] mt-[2vh] md:mt-0 md:py-10 pb-5' onClick={
                        () => {
                            setGatilloOpcionesVentas(!gatilloOpcionesVentas)
                        }
                    }>
                        <img src={boton3bars} alt="Options button mobile w-[100%]" />
                    </button>
                </div>

                <div className={"hidden xl:flex flex-col xl:flex-row bg-cyan-800 items-center justify-between p-1 fixed w-full top-0 px-8 z-10 xl:bg-[url(" + bannerVentas2 + ")] bg-no-repeat xl:bg-[length:100vw_auto] bg-[position:0_0] bg-fixed h-[20vh] xl:h-auto xl:pb-4 shadow-xl xl:rounded-xl shadow xl:rounded-t-none py-3 bg-sky-600 bg-cover bg-center xl:bg-contain  bg-fixed"}>
                    <div></div>
                    <ul className='text-white w-[60%] text-2xl italic hidden xl:flex flex-row justify-end items-center'>
                        <li className='border-l-2 px-3 pr-2 pb-1 rounded-xl rounded-l-none shadow-xl font-bold text-2xl mr-4 not-italic'>
                            <h1>Ventas</h1>
                        </li>
                        <li className='border-l-2 px-2  mr-4 pl-3 pr-2'>
                            <button onClick={
                                () => {
                                    window.location.href = ipRuta + '/inventario'
                                }
                            }>Inventario</button>
                        </li>
                        <li className='border-l-2 px-2  mr-4 pl-3 pr-2'>
                            <button onClick={
                                () => {
                                    window.location.href = ipRuta + '/historial'
                                }
                            }>Historial</button>
                        </li>
                        <li className='border-l-2 px-2  mr-4 pl-3 pr-2'>
                            <h1>Autor</h1>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
    )
}