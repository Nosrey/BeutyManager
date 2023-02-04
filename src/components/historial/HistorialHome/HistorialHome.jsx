// CREO UN componente vacio de jsx
// import React from 'react'
import React from "react";
import HistorialHeader from '../HistorialHeader/HistorialHeader.jsx'
import HistorialLista from '../HistorialLista/HistorialLista.jsx'

export default function HistorialHome() {
    return (
        <div>
            <HistorialHeader />
            <HistorialLista />
        </div>
    );
}