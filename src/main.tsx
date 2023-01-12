import ReactDOM from 'react-dom/client'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './index.css'

import LoginPage from './components/LoginPage/LoginPage';
import AccueilPage from './components/AccueilPage/AccueilPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import ProducerCreatePage from './components/ProducerCreatePage/ProducerCreatePage';
import Seller from './components/Seller/Seller'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderPage from './components/HeaderPage';
import FooterPage from './components/FooterPage';
import MakerProducts from './components/MakerProducts/MakerProducts';
import AddSellerProduct from './components/AddSellerProduct/AddSellerProduct';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <HeaderPage />

        <Routes>
            <Route path="/" element={<AccueilPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="producer-create" element={<ProducerCreatePage />} />
            <Route path="seller" element={<Seller />} />
            <Route path="maker/products" element={<MakerProducts />} />
            <Route path="seller/:id/add_product" element={<AddSellerProduct />} />
        </Routes>

        <FooterPage />
    </BrowserRouter>
)
