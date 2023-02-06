// importo el css
import './eliminarProducto.css';
import React from 'react';
import { connect } from 'react-redux';
// importo productoToEdit
import Axios from 'axios';
// importo ip de Home.jsx
import { ip } from '../home/Home.jsx';
import { cambiarGatilloEliminar, setProductos } from '../../actions';
// importo X.png de images
import X from '../../images/X.png';
import allow from '../../images/allow.png';
import paper from '../../images/paper.png';



// implemento las actiones y los estados

function eliminarProducto({ visible, productoToEdit, cambiarGatilloEliminar, setProductos, input1, setCargando }) {
    function eliminar() {
        setCargando(true)
        Axios.delete(ip + '/products/' + productoToEdit.id, { id: productoToEdit.id })
            .then(() => setProductos(input1))
            .then(() => {
                cambiarGatilloEliminar()
                setCargando(false)
            })
            .catch((err) => {
                console.log('error en eliminar producto: ', err.response.data);
            })
    }


    return (
        <div className={(visible) ? 'text-4xl rounded-xl w-[80%] md:w-[40%] md:left-[30%] md:top-[15%] xl:w-[30%] fixed top-[30%] xl:top-[20%] left-[10%] xl:left-[35%] z-30' : 'hidden'}>
            <div className='flex flex-col bg-white border shadow text-center rounded-2xl p-4 xl:p-6 xl:pt-3 pt-2 justify-center items-center '>
                <img src={paper} alt='x example' className='mt-2 w-[25%]' />
                <h2 className='mt-2 mb-6 text-2xl xl:text-3xl italic text-stone-800'>¿Estas seguro que quieres eliminar este producto?</h2>
                <div className='flex flex-row justify-center items-center'>
                    <button className='mx-4 m-0 text-lg bg-green-500 text-white font-semibold p-1 rounded-md  text-md text-2xl xl:text-3xl shadow-sm xl:hover:animate-pulse italic w-[25%]' onClick={eliminar}>
                        <img src={allow} alt='confirmBtn' className='w-[100%]' />
                    </button>
                    <button className='mx-4 m-0 text-lg bg-red-500 text-white font-semibold p-2 rounded-md  text-md text-2xl xl:text-3xl shadow-sm xl:hover:animate-pulse italic w-[25%]' onClick={cambiarGatilloEliminar}>
                        <img src={X} alt='cancelBtn' className='w-[100%]' />
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productoToEdit: state.productoToEdit,
        input1: state.input1,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        cambiarGatilloEliminar: () => dispatch(cambiarGatilloEliminar()),
        setProductos: (input, orden) => dispatch(setProductos(input, orden)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(eliminarProducto);