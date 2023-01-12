import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
	<div className="container">
      <nav>
        <Link to="login"><button>Ce connecter</button></Link>
        <Link to="register"><button>S'inscrire</button></Link>
        <Link to="producer-create"><button>Créer un produit (producteur)</button></Link>
      </nav>
	</div>
  );
}
export default LoginPage;