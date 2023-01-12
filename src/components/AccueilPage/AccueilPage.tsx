import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderPage from '../HeaderPage';

function LoginPage() {
  return (  
    
	<div id="content">
      <nav>
        <Link to="login"><button>Se connecter</button></Link>
        <Link to="register"><button>S'inscrire</button></Link>
        <Link to="producer-create"><button>Créer un produit (producteur)</button></Link>
      </nav>
	</div>
  );
}
export default LoginPage;
