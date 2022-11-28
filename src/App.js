import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './components/login/Login.jsx'
import Home from './components/home/Home.jsx'
import React from 'react';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/products" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
