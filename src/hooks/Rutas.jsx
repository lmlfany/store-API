import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import Scanner from '../components/Scanner';

const Rutas = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/scanner" element={<Scanner />} />
      </Routes>
    </Router>
  );
};

export default Rutas;