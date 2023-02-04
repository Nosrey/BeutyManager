import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/home/Home.jsx'
// importo el componente ventas
import VentasHome from './components/ventas/VentasHome/VentasHome.jsx'
import HistorialHome from './components/historial/HistorialHome/HistorialHome.jsx'
import React from 'react';

// const ipRuta = "/beautyManager/#" // para la web
let ipRuta = "#" // para local
export { ipRuta }

function App() {

  return (
    <div className={'w-full'} id='base'>
      <Routes>
        <Route path="/inventario" element={<Home />} />
        <Route path="/ventas" element={<VentasHome />} />
        <Route path="/historial" element={<HistorialHome />} />
        <Route path='*' element={<Navigate to={`/inventario`} />} />
      </Routes>
    </div>
  );
}

export default App;
