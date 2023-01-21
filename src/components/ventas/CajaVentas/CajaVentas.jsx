// creo un componente con stateToProps y dispatchToProps
import React from 'react';
import { connect } from "react-redux";

function CajaVentas({ productosVentas }) {
    return (
        <div className="border-2 border-black">
            {/* creo una lista en ul de li elements donde cada li element es un producto de productosVentas */}
            <ul>
                {productosVentas?.map(producto => {
                    return (
                        <li key={producto.id}>
                            <div className="flex flex-row justify-between">
                                <p>{producto.name}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>                          
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CajaVentas);

