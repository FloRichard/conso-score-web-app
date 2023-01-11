import './App.css'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
      <div>
          <a href="/register">S'inscrire</a>
          <br/>
          <a href="/login">Se connecter</a>
          <br/>
          <a href="/producer-create">Producteur créer produit</a>
          <br/>
      </div>
  )
}

export default App
