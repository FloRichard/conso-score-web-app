import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Navbar from '../Navigation/nav-bar';

interface FormData {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  producerOrReseller: boolean;
  localisation: string;
}

interface ServerResponse {
  success: boolean;
  message: string;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [serverResponse, setServerResponse] = useState<ServerResponse>();

  const onSubmit = async (data: FormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match.");
      }
      
      const rawResponse = await fetch('/signup', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      const response = await rawResponse.json();
      
      if (response.success) {
        setServerResponse({ success: true, message: response.message });
        window.location.href = '/homepage';
      } else {
        setServerResponse({ success: false, message: response.message });
      }
    } catch (err: any) {
      setServerResponse({ success: false, message: err.message });
    }
  };

  return (
      <div>
        <Navbar />
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Nom:</label>
            <input
              {...register("name", {required: true})}
              type="text"
              id="name"
              name="name"
            />
            {errors.name && <p>Ce champ est obligatoire</p>}
          </div>

          <div>
            <label htmlFor="username">Nom d'utilisateur:</label>
            <input
              {...register("username", {required: true})}
              type="text"
              id="username"
              name="username"
            />
            {errors.username && <p>Ce champ est obligatoire</p>}
          </div>

          <div>
            <label htmlFor="password">Mot de passe:</label>
            <input
              {...register("password", {required: true})}
              type="password"
              id="password"
              name="password"
            />
            {errors.password && <p>Ce champ est obligatoire</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
            <input
              {...register("confirmPassword", {required: true})}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
            {errors.confirmPassword && <p>Ce champ est obligatoire</p>}
          </div>

          <div>
            <label htmlFor="producerOrReseller1">
                <input
                {...register("producerOrReseller", {required: true})}
                type="radio"
                name="producerOrReseller"
                id="producerOrReseller1"
                value="true" />
              Producteur
            </label>
            <label htmlFor="producerOrReseller2">
                <input
                {...register("producerOrReseller", {required: true})}
                type="radio"
                name="producerOrReseller"
                id="producerOrReseller2"
                value="false"
                  />
              Vendeur
            </label>
            {errors.producerOrReseller && <p>Ce champ est obligatoire</p>}
          </div>
          
          <div>
            <label htmlFor="localisation">Localisation:</label>
            <input
              {...register("localisation", {required: true})}
              type="text"
              id="localisation"
              name="localisation"
            />
            {errors.localisation && <p>Ce champ est obligatoire</p>}
          </div>

          <button type="submit">S'inscrire</button>

          <p>
              Vous avez déjà un compte ? <a href="/login">Se connecter</a>
          </p>

          {serverResponse && (
            <p style={{ color: serverResponse.success ? "green" : "red" }}>
              {serverResponse.message}
            </p>
          )}
        </form>
      </div>
      </div>
  );
};

export default SignUp;
