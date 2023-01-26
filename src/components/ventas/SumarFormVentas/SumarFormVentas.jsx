// importo connect, react, useEffect y lo necesario
import { connect } from "react-redux";
import { useEffect } from "react";

function SumarFormVentas({ numero, setNumero, gatillo, id, productos }) {
    // creo un useEffect donde se revisa si numero es mayor a stock con su id, si lo es entonces lo iguala para que no supere el limite, tambien revisa si es menor a 0, si lo es entonces lo lleva a 0
    useEffect(() => {
        if (productos.length) {
            console.log('entre')
            let productoEncontrado = productos.find((el) => el.id === id)
            if (numero[id] > productoEncontrado.stock) setNumero({ ...numero, [id]: productoEncontrado.stock })
            if (numero[id] < 0) setNumero({ ...numero, [id]: 0 })
        }
        // eslint-disable-next-line 
    }, [numero[id]])

    return (
        <div className={(gatillo) ? "fixed z-20 w-full" : 'hidden'}>
            <form className="flex flex-col">
                <label htmlFor="cantidad">Cantidad</label>
                <div className="flex flex-row items-center justify-center">
                    <button onClick={(e) => { e.preventDefault(); setNumero({ ...numero, [id]: numero[id] - 1 }) }}>-</button>
                    <input type={"number"} value={numero[id]} placeholder='Cantidad' onChange={(e) => {
                        setNumero({ ...numero, [id]: e.target.value })
                    }} />
                    <button onClick={(e) => { e.preventDefault(); setNumero({ ...numero, [id]: numero[id] + 1 }) }}>+</button>
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