import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Product } from '../MakerProducts/ProductModel';

type Category = {
    name: string
}

type Transport = {
    name: string
    carbon_footprint: number
}

type ConsoScore = {
    conso_score: number
    tax: number
}

type SellerFormData = {
    product_id: string
    bar_code: string
    price: number
    quantity: number
}

type LocationStateContainer = {
    product: Product
    seller_id: string
}

const AddSellerProduct = () => {
    const location = useLocation() || "unknown"
    const locationState = location.state as LocationStateContainer

    const [product, setProduct] = useState<Product>(locationState.product || undefined)
    const [sellerID, setSellerID] = useState(locationState.seller_id)
    const [category, setCategory] = useState<Category>()
    const [transport, setTransport] = useState<Transport>()
    const [consoScore, setConsoScore] = useState<ConsoScore>()
    const [showRenderResult, setShowRenderResult] = useState(false)
    const [sellerFormData, setSellerFormData] = useState<SellerFormData>()

    useEffect(() => {
        fetch('http://localhost:9092/datas/category/' + product.category_id)
            .then(res => res.json())
            .then(data => setCategory(data as Category))

        fetch('http://localhost:9092/datas/transport/' + product.expedition_transport_id)
            .then(res => res.json())
            .then(data => setTransport(data as Transport))
    }, [])



    const renderResult = (showResult: Boolean) => {
        if (showResult) {
            const computeTax: number = consoScore!.tax / 100
            return (
                <div className="text-start">
                    <h3>Resultat</h3>
                    <p> Le conso-score de votre produit est {consoScore?.conso_score}. La taxe appliquée à ce produit est {consoScore?.tax}% du prix de vente.</p>
                    <p> Pour {sellerFormData?.quantity} {product.name}, le montant total de la taxe sera {sellerFormData!.quantity * (computeTax * sellerFormData!.price)}.</p>
                </div>
            )
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const quantityInput = document.getElementById("quantity") as HTMLInputElement
        const barCodeInput = document.getElementById("barcode") as HTMLInputElement
        const priceInput = document.getElementById("seller_price") as HTMLInputElement
        const formData: SellerFormData = {
            product_id: product.product_id,
            quantity: quantityInput.value as unknown as number,
            bar_code: barCodeInput.value,
            price: priceInput.value as unknown as number

        }
        setSellerFormData(formData)
        fetch('http://localhost:9092/seller/' + sellerID + '/product', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                data as ConsoScore
                setConsoScore(data)
                setShowRenderResult(true)
            })
    }

    return (
        <div className="container-fluid">
            <div className="row h-100">
                <form target="_blank" onSubmit={handleSubmit}>
                    <h3 className="text-start">{product.name} detail</h3>
                    <div className="form-group row">
                        <div className="form-group col text-start">
                            <label htmlFor="category">Catégorie</label>
                            <input type="text" readOnly className="form-control" id="category" placeholder="Category" value={category?.name} />
                        </div>
                        <div className="form-group col text-start">
                            <label htmlFor="price">Prix</label>
                            <input type="text" readOnly className="form-control" id="price" placeholder="Price" value={product?.price || 1} />
                        </div>
                    </div>
                    <h3 className="text-start mt-2">informations sur le transport</h3>
                    <div className="form-group row">
                        <div className="form-group col text-start">
                            <label htmlFor="type">Type</label>
                            <input type="text" readOnly className="form-control" id="type" placeholder="Type" value={transport?.name} />
                        </div>
                        <div className="form-group col text-start">
                            <label htmlFor="carbon_fp" >Empreinte carbone (par Km)</label>
                            <input type="text" readOnly className="form-control" id="carbon_fp" placeholder="Carbon footprint" value={transport?.carbon_footprint} />
                        </div>
                    </div>
                    <h3 className="text-start">Empreinte carbone de la production</h3>
                    <div className="form-group text-start">
                        <label htmlFor="carbon_footprint_maker">Empreinte carbone en gramme par kg de produit</label>
                        <input type="text" readOnly className="form-control" id="carbon_footprint_maker" placeholder="Carbon footprint" aria-describedby="maker_fp_description" value={product?.carbon_footprint} />
                        <small id="maker_fp_description" className="form-text text-muted">
                            Cela correspond à l'empreinte carbone du produit lors de sa production.
                        </small>
                    </div>
                    <h3 className="text-start">Calculer le conso-score</h3>
                    <div className="form-group text-start">
                        <label htmlFor="barcode">Code barre</label>
                        <input type="number" className="form-control" id="barcode" placeholder="Bar code number" />
                    </div>
                    <div className="form-group text-start">
                        <label htmlFor="seller_price">Prix (€)</label>
                        <input type="number" className="form-control" id="seller_price" placeholder="Your selling price" aria-describedby="seller_price_helper" />
                        <small id="seller_price_helper" className="form-text text-muted">
                            Renseignez votre prix de vente sans la taxe conso-score appliquée.
                        </small>
                    </div>
                    <div className="form-group text-start">
                        <label htmlFor="quantity">Quantité à acheter</label>
                        <input type="number" className="form-control" id="quantity" placeholder="Quantity" aria-describedby="quantity_helper" />
                        <small id="quantity_helper" className="form-text text-muted">
                            Cela correspond à la quantité de ce produit que vous souhaitez avoir en stock.
                        </small>
                    </div>
                    {renderResult(showRenderResult)}
                    <div>
                        <button type="submit"> Calculer</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AddSellerProduct