// CREO UN componente vacio de jsx
// import React from 'react'
import React from "react";
import HistorialHeader from '../HistorialHeader/HistorialHeader.jsx'
import HistorialLista from '../HistorialLista/HistorialLista.jsx'
import HistorialPantallaCarga from '../HistorialPantallaCarga/HistorialPantallaCarga.jsx'
import { useState } from 'react';

export default function HistorialHome() {
    const [cargando, setCargando] = useState(false);
    return (
        <div>
            <HistorialPantallaCarga gatillo={cargando} />
            <HistorialHeader />
            <HistorialLista cargando={cargando} setCargando={setCargando} />
        </div>
    );
}