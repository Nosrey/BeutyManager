import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/home/Home.jsx'
// importo el componente ventas
import VentasHome from './components/ventas/VentasHome/VentasHome.jsx'
import React from 'react';

// const ipRuta = "/beautyManager/#"
let ipRuta = "#"
export { ipRuta }

function App() {

  return (
    <div className={'w-full'} id='base'>
      <Routes>
        <Route path="/inventario" element={<Home />} />
        <Route path="/ventas" element={<VentasHome />} />
        <Route path='*' element={<Navigate to={`/inventario`} />} />
      </Routes>
    </div>
  );
}

export default App;
