import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/home/Home.jsx'
import React from 'react';

function App() {
  return (
    <div className='w-full'>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='*' element={<Navigate to ='/'/>}/>
      </Routes>
    </div>
  );
}

export default App;
