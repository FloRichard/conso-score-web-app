import React, { useState } from 'react';

function LoginPage() {
  const [userName, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: any) => {
	e.preventDefault();
	fetch('/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userName: userName, password: password }),
	})
	.then((res) => {
		if (!res.ok) {
			throw new Error(res.statusText);
		}
		return res.json();
	})
	.then((data) => {
		// traiter les données de réponse ici
		// et mettre à jour l'état de connexion
	})
	.catch((err) => {
		console.error(err);
	});
  }

  return (
	<div className="container">
		<form onSubmit={handleSubmit}>
            <label>
                Nom d'Utilisateur:
                <input
                type="userName"
                value={userName}
                onChange={(e) => setName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Mot de passe:
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Se connecter</button>
            <p>
              Vous n'avez pas encore de compte ? <a href="/register">S'inscrire</a>
            </p>
		</form>
	</div>
  );
}

export default LoginPage;
