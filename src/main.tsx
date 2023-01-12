import ReactDOM from 'react-dom/client'
import './index.css'
import './components/Global.css'

import LoginPage from './components/LoginPage/LoginPage';
import AccueilPage from './components/AccueilPage/AccueilPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import ProducerCreatePage from './components/ProducerCreatePage/ProducerCreatePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AccueilPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="producer-create" element={<ProducerCreatePage />} />
        </Routes>

        <AccueilPage></AccueilPage>
    </BrowserRouter>
)
