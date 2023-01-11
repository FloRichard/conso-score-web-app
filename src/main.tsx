import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
			<Route path="login" element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
)
