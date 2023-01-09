import React from 'react';
import { connect } from 'react-redux';
// importo cambiarPagina de actions
import { cambiarPagina } from '../../actions';
// importo arrow de images
import arrowRight from '../../images/arrowRight.png';
import arrowLeft from '../../images/arrowLeft.png';

function paginado({ cambiarPagina, pagina }) {

    return (
        <div className='flex flex-row justify-center items-center my-2'>
            <button className='w-[10%] md:w-[5%] xl:w-[3.5%]' onClick={() => cambiarPagina(pagina - 1)}>
                <img src={arrowLeft} alt='arrowLeft' className='' />
            </button>
            <h1 className='inline mx-5 border px-3 font-bold text-2xl text-center border-black border-2 rounded-md'>{pagina}</h1>
            <button className='w-[10%] md:w-[5%] xl:w-[3.5%]' onClick={() => cambiarPagina(pagina + 1)}>
                <img src={arrowRight} alt='rightArrow' className='' />
            </button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        pagina: state.pagina,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        cambiarPagina: (pagina) => dispatch(cambiarPagina(pagina)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(paginado);