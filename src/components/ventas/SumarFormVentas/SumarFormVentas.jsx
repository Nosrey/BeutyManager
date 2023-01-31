// importo connect, react, useEffect y lo necesario
import { connect } from "react-redux";
import { useEffect } from "react";
import cancel from '../../../images/cancel.png'
import removeBtn from '../../../images/removeBtn.png'
import addBtn2 from '../../../images/addBtn2.png'

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
        <div className={(gatillo) ? 'text-4xl rounded-xl w-[50%] xl:w-[30%] fixed top-[30%] xl:top-[20%] left-[25%] xl:left-[35%] z-30' : 'hidden'}>
            <form className="flex flex-col bg-white border shadow text-center rounded-2xl p-4 xl:p-6 xl:pt-3 pt-2 justify-center items-center ">
                <button type="button" onClick={() => setGatillo(false)} className='w-[10%] absolute right-2 top-0'>
                    <img src={cancel} alt='cancel-btn' className='shadow-sm xl:hover:animate-pulse inline w-[100%]' />
                </button>
                <label htmlFor="cantidad" className="mt-2 mb-6 text-2xl xl:text-3xl italic text-stone-800">Cantidad</label>
                <div className="flex flex-row justify-center items-center">
                    <button className="w-[12%] mr-2" onClick={(e) => { e.preventDefault(); setNumero({ ...numero, [id]: numero[id] - 1 }) }}>
                        <img src={removeBtn} alt='removeBtn' className="w-[100%]"/>
                    </button>
                    <input  value={numero[id]} placeholder={sacarPlaceholder} onChange={(e) => {
                        setNumero({ ...numero, [id]: e.target.value })
                    }} className='w-[60%] text-md text-center border rounded-xl ' />
                    <button className="w-[12%] ml-2" onClick={(e) => { e.preventDefault(); setNumero({ ...numero, [id]: numero[id] + 1 }) }}>
                        <img src={addBtn2} alt='addBtn2' className="w-[100%]"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SumarFormVentas)