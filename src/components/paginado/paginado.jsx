// importo el css
import './paginado.css';
import React from 'react';
import { connect } from 'react-redux';
// importo cambiarPagina de actions
import { cambiarPagina } from '../../actions';

function paginado({ cambiarPagina, pagina }) {

    return (
        <div className='flex flex-row justify-center items-center my-3'>
            {/* <button className='w-[8%] md:w-[5%] xl:w-[3.5%]' onClick={() => cambiarPagina(pagina - 1)}>
                <img src={arrowLeft} alt='arrowLeft' className='' />
            </button> */}

            <button onClick={() => cambiarPagina(pagina - 1)} type="button" class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:hover:bg-slate-700">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Icon description</span>
            </button>

            <h1 className='inline mx-2 md:mx-5 border px-3 font-bold text-lg md:text-2xl text-center border-black border-2 rounded-md'>{pagina}</h1>

            {/* <button className='w-[8%] md:w-[5%] xl:w-[3.5%]' onClick={() => cambiarPagina(pagina + 1)}>
                <img src={arrowRight} alt='rightArrow' className='' />
            </button> */}

            <button onClick={() => cambiarPagina(pagina + 1)} type="button" class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:hover:bg-slate-700">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Icon description</span>
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