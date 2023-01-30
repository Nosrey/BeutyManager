import Axios from "axios";
// importare connect y luego creare las funciones mapstatetoprops y statetoprops para aplicar el connect
import { connect } from "react-redux";
// importo setProductos de las acciones
import { setProductos } from '../../../actions/index'
// importo shoppingCar.png
import shoppingCar from '../../../images/shoppingCar.png'
import addBtn2 from '../../../images/addBtn2.png'

function totalPrecioVentas({ lista, cantidades, setLista, setCantidades, ip, setProductos }) {
    // creo una funcion para calcular el total tomando en cuenta cuantos elementos se venderan en base a sus cantidades en cantidades
    const calcularTotal = (lista, cantidades) => {
        let total = 0;
        lista.forEach(element => {
            total += element.price * cantidades[element.id]
        });
        return total
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
            })

            .catch((err) => {
                console.log('sucedio un error: ', err.response.data);
            })
    }
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center justify-around">
                <h1>Total</h1>
                <h1>{'$' + calcularTotal(lista, cantidades)}</h1>
            </div>
            <div className="w-auto text-center  mx-auto cursor-pointer p-2 shadow rounded-md" onClick={vender}>
                <p className="inline">VENDER</p>
            </div>

            <button onClick={vender} className='xl:hidden xl:z-10 hover:bg-slate-50 text-xl   mx-10 xl:ml-10 xl:fixed flex flex-col items-center justify-center xl:bottom-[-1%] xl:right-0 xl:mr-0 bg-white border p-3 pr-4 py-2 xl:py-3 shadow rounded-lg hover:animate-pulse'>
                <img src={shoppingCar} alt="shoppingCar" className="w-12 mx-auto " />
                <div className="flex flex-row items-center justify-center">
                    <h1 className='mr-3 inline text-black font-bold text-1xl'>Vender</h1>
                    <img className='inline rounded text-base xl:text-xl w-8' src={addBtn2} alt='addBtn2' />
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

export default connect(mapStateToProps, mapDispatchToProps)(totalPrecioVentas);