import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/home/Home.jsx'
import React from 'react';

function App() {
  return (
    <div className='w-full'>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
