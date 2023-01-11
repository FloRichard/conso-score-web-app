import React from 'react'
import ReactDOM from 'react-dom/client'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from './App'
import './index.css'

import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import Seller from './components/Seller/Seller'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MakerProducts } from './components/MakerProducts/MakerProducts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
			<Route path="login" element={<LoginPage />} />
			<Route path="register" element={<RegisterPage />} />
            <Route path="seller" element={<Seller />} />
            <Route path="maker/:id/products" element={<MakerProducts />} />
        </Routes>
    </BrowserRouter>
)
