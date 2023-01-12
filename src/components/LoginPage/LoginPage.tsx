import React, { useState } from 'react';

type LoginResponse = {
  entity_id: string
  status: string
  user_id: string
}
function LoginPage() {
  const [userName, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch('http://localhost:9093/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: userName, password: password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        const loginRes = data as LoginResponse
        window.localStorage.setItem("entity_id", loginRes.entity_id)
        window.localStorage.setItem("status", loginRes.status)
        window.localStorage.setItem("user_id", loginRes.user_id)
        console.log(loginRes)
        if (loginRes.status == "SELLER") {
          window.location.assign("/seller")
        }
        if (loginRes.status == "MAKER") {
          window.location.assign("/producer-create")
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div id="content">
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
