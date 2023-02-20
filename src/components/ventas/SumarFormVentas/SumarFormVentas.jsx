// importo connect, react, useEffect y lo necesario
import { connect } from "react-redux";
import { useEffect } from "react";
import cancel from '../../../images/cancel.png'

function SumarFormVentas({ numero, setNumero, gatillo, id, productos, setGatillo }) {
    // creo un useEffect donde se revisa si numero es mayor a stock con su id, si lo es entonces lo iguala para que no supere el limite, tambien revisa si es menor a 0, si lo es entonces lo lleva a 0
    useEffect(() => {
        if (productos.length) {
            console.log('entre')
            let productoEncontrado = productos.find((el) => el.id === id)
            if (numero[id] > productoEncontrado.stock) setNumero({ ...numero, [id]: productoEncontrado.stock })
            else if (numero[id] < 0 || !numero[id] || isNaN(numero[id])) setNumero({ ...numero, [id]: 0 })
            else if (numero[id][0] === '0' && numero[id].length > 1) setNumero({ ...numero, [id]: numero[id].slice(1) })
        }
        // eslint-disable-next-line 
    }, [numero[id]])

    // declaro la function sacarPlaceholder la cual obtiene el producto cuyo id sea igual a la recibida en el componente y luego retorna el valor de stock de dicho producto
    const sacarPlaceholder = () => {
        let productoEncontrado = productos.find((el) => el.id === id)
        if (!productoEncontrado) return 0
        else return productoEncontrado.stock
    }

    return (
        <div className={(gatillo) ? 'text-4xl rounded-xl w-[50%] md:w-[30%] md:left-[35%]  xl:w-[20%] xl:left-[40%] xl:top-[25%] fixed top-[30%]  left-[25%] z-30' : 'hidden'}>
            <form className="flex flex-col bg-white border shadow text-center rounded-2xl p-4 xl:p-6 xl:pt-3 pt-2 justify-center items-center ">
                <button type="button" onClick={() => setGatillo(false)} className='w-[10%] absolute right-2 md:right-3 top-0 xl:right-2'>
                    <img src={cancel} alt='cancel-btn' className='shadow-sm xl:hover:animate-pulse inline w-[100%]' />
                </button>
                <label htmlFor="cantidad" className="mt-2 mb-6 text-2xl xl:text-3xl text-stone-800">Cantidad</label>
                <div className="flex flex-row justify-center items-center">
                    {/* <button className="w-[15%] mr-4 md:mr-6" onClick={(e) => { e.preventDefault(); setNumero({ ...numero, [id]: numero[id] - 1 }) }}>
                        <img src={removeBtn} alt='removeBtn' className="w-[100%]"/>
                    </button> */}

                    <button onClick={(e) => { e.preventDefault(); setNumero({ ...numero, [id]: numero[id] - 1 }) }} type="button" class="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-4 dark:bg-sky-600 dark:hover:bg-sky-700">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Icon description</span>
                    </button>

                    <input value={numero[id]} placeholder={sacarPlaceholder} onChange={(e) => {
                        setNumero({ ...numero, [id]: e.target.value })
                    }} className='w-[40%] text-md text-center border rounded-xl ' />

                    <button onClick={(e) => { e.preventDefault(); setNumero({ ...numero, [id]: numero[id] + 1 }) }} type="button" class="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center ml-4 dark:bg-sky-600 dark:hover:bg-sky-700">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Icon description</span>
                    </button>

                    {/* <button className="w-[15%] ml-4 md:ml-6" onClick={(e) => { e.preventDefault(); setNumero({ ...numero, [id]: numero[id] + 1 }) }}>
                        <img src={addBtn2} alt='addBtn2' className="w-[100%]"/>
                    </button> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(SumarFormVentas)