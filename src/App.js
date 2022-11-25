import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './components/login/Login.jsx'
import Home from './components/home/Home.jsx'
import React from 'react';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
