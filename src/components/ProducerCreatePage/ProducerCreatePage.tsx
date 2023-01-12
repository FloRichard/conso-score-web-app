import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type Category = {
  category_id: string
  name: string
}

type Transport = {
  transport_id: string
  name: string
}

interface ProductData {
  name: string;
  carbon_footprint: number;
  price: number;
  category_id: string
}

interface ServerResponse {
  success: boolean;
  message: string;
}

type Body = {
  name: string;
  carbon_footprint: number;
  price: number;
  category_id: string
  expedition_transport_id: string
  quantity_unity: string
}

const ProducerCreatePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductData>();
  const [serverResponse, setServerResponse] = useState<ServerResponse>();
  const [categories, setCategories] = useState<Category[]>()
  const [transports, setTransports] = useState<Transport[]>()

  useEffect(() => {
    fetch('http://localhost:9092/datas/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data as unknown as Category[])
      })
    fetch('http://localhost:9092/datas/transport')
      .then(res => res.json())
      .then(data => {
        setTransports(data as unknown as Transport[])
      })
  }, [])

  const onSubmit = async (data: ProductData) => {
    var e = (document.getElementById("quantity_unity")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    var quantity_unity = opt.value

    e = (document.getElementById("select_category")) as HTMLSelectElement;
    sel = e.selectedIndex;
    opt = e.options[sel];
    var category_id = opt.value

    e = (document.getElementById("select_transport")) as HTMLSelectElement;
    sel = e.selectedIndex;
    opt = e.options[sel];
    var transport_id = opt.value
    const body: Body = {
      name: data.name,
      price: data.price,
      quantity_unity: quantity_unity,
      carbon_footprint: data.carbon_footprint,
      category_id: category_id,
      expedition_transport_id: transport_id
    }
    try {
      const rawResponse = await fetch('http://localhost:9092/maker/5503a140-ab18-4d1a-8b17-3356e8e01a80/product', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
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
    <div id="content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nom du produit:</label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="name"
            name="name"
          />
          {errors.name && <p>Ce champ est obligatoire</p>}
        </div>

        <div>
          <label htmlFor="quantity_unity">Unité: </label>

          <div className="horizontal">
            <select id="quantity_unity">
              <option value="Kilo">Kilo</option>
              <option value="Litre">Litre</option>
              <option value="unité">A l'unité</option>
            </select>
          </div>

        </div>
        <label htmlFor="select_category">Categories: </label>
        <select id="select_category">
          {categories?.map((category, index) => {
            return (<option value={category.category_id} key={index}>{category.name}</option>)
          })
          }
        </select>

        <label htmlFor="select_transport">Transport: </label>
        <select id="select_transport">
          {transports?.map((transport, index) => {
            return (<option value={transport.transport_id} key={index}>{transport.name}</option>)
          })
          }
        </select>
        <div>
          <label htmlFor="carbon_footprint">Empreinte carbone (g):</label>
          <input
            {...register("carbon_footprint", { required: true })}
            type="number"
            id="carbon_footprint"
            name="carbon_footprint"
          />
          {errors.carbon_footprint && <p>Ce champ est obligatoire</p>}
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

