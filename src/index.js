import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './componentes/login/Login';

ReactDOM.render(
  <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/calculadora" element={<App />} />
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
