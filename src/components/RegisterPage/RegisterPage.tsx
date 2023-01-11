import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          {...register("name", {required: true})}
          type="text"
          id="name"
          name="name"
        />
        {errors.name && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="username">Username:</label>
        <input
          {...register("username", {required: true})}
          type="text"
          id="username"
          name="username"
        />
        {errors.username && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          {...register("password", {required: true})}
          type="password"
          id="password"
          name="password"
        />
        {errors.password && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          {...register("confirmPassword", {required: true})}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
        />
        {errors.confirmPassword && <p>This field is required</p>}
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
        {errors.producerOrReseller && <p>This field is required</p>}
      </div>
      
      <div>
        <label htmlFor="localisation">Localisation:</label>
        <input
          {...register("localisation", {required: true})}
          type="text"
          id="localisation"
          name="localisation"
        />
        {errors.localisation && <p>This field is required</p>}
      </div>

      <button type="submit">Submit</button>

      <p>
          Vous avez déjà un compte ? <a href="/login">Se connecter</a>
      </p>

      {serverResponse && (
        <p style={{ color: serverResponse.success ? "green" : "red" }}>
          {serverResponse.message}
        </p>
      )}
    </form>
  );
};

export default SignUp;
