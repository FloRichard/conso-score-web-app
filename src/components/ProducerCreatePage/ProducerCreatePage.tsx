import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface ProductData {
  productName: string;
  unity: string;
  carbonFootprint: number;
  price: number;
}

interface ServerResponse {
  success: boolean;
  message: string;
}

const ProducerCreatePage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductData>();
  const [serverResponse, setServerResponse] = useState<ServerResponse>();

  const onSubmit = async (data: ProductData) => {
    try {
      const rawResponse = await fetch('/product', {
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
      } else {
        setServerResponse({ success: false, message: response.message });
      }
    } catch (err: any) {
      setServerResponse({ success: false, message: err.message });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="productName">Nom du produit:</label>
          <input
            {...register("productName", { required: true })}
            type="text"
            id="productName"
            name="productName"
          />
          {errors.productName && <p>Ce champ est obligatoire</p>}
        </div>

        <div>
          <label htmlFor="unity">Unité: </label>

          <div>
            <select>
              <option value="kilos">Kilos</option>
              <option value="litres">Litres</option>
              <option value="unite">Unité</option>
            </select>
            <input
              {...register("unity", { required: true })}
              type="text"
              id="unity"
              name="unity"
              />
          </div>

          {errors.unity && <p>Ce champ est obligatoire</p>}
        </div>

        <div>
          <label htmlFor="carbonFootprint">Empreinte carbone (g):</label>
          <input
            {...register("carbonFootprint", { required: true })}
            type="number"
            id="carbonFootprint"
            name="carbonFootprint"
          />
          {errors.carbonFootprint && <p>Ce champ est obligatoire</p>}
        </div>

        <div>
          <label htmlFor="price">Prix:</label>
          <input
            {...register("price", { required: true })}
            type="number"
            id="price"
            name="price"
          />
          {errors.price && <p>Ce champ est obligatoire</p>}
        </div>

        <button type="submit">Ajouter produit</button>

        {serverResponse && (
          <p style={{ color: serverResponse.success ? "green" : "red" }}>
            {serverResponse.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default ProducerCreatePage;
