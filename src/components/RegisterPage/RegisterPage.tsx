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

/*
const SignUp: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
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
    } catch (err) {
      setServerResponse({ success: false, message: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          ref={register({ required: true })}
        />
        {errors.name && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          ref={register({ required: true })}
        />
        {errors.username && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          ref={register({ required: true })}
        />
        {errors.confirmPassword && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="producerOrReseller">
          <input
            type="checkbox"
            id="producerOrReseller"
            name="producerOrReseller"
            ref={register({ required: true })}
          />
          Producer or Reseller
        </label>
        {errors.producerOrReseller && <p>This field is required</p>}
      </div>
      
      <div>
        <label htmlFor="localisation">Localisation:</label>
        <input
          type="text"
          id="localisation"
          name="localisation"
          ref={register({ required: true })}
        />
        {errors.localisation && <p>This field is required</p>}
      </div>

      <button type="submit">Submit</button>

      {serverResponse && (
        <p style={{ color: serverResponse.success ? "green" : "red" }}>
          {serverResponse.message}
        </p>
      )}
    </form>
  );
};
*/

const SignUp: React.FC = () => {
  return (
    <div></div>
  )
}

export default SignUp;
