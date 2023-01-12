import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../MakerProducts/ProductModel";

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
                    <h4>Resultat</h4>
                    <p> Votre produit a un conso score de {consoScore?.conso_score}. Une taxe correpondant à {consoScore?.tax}% du prix de vente devra être appliquée sur le produit, soit {(computeTax * sellerFormData!.price)} euros.</p>
                    <p> Pour {sellerFormData?.quantity} {product.name}, le montant total de la taxe est de {sellerFormData!.quantity * (computeTax * sellerFormData!.price)} euros.</p>
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
        <div className="container h-100 mt-5 w-50">
            <div className="row w-75 mx-auto">
                <form target="_blank" onSubmit={handleSubmit}>
                    <h4 className="text-start">{product.name}</h4>
                    <div className="row text-start ">
                        <div className="col">
                            <p><b>Catégorie:</b> {category?.name}</p>
                        </div>
                        <div className="col">
                            <p><b>Prix:</b> {product?.price}</p>
                        </div>
                    </div>
                    <h4 className="text-start mt-2">Moyen de transport</h4>
                    <div className="form-group row text-start">
                        <div className="col">
                            <p><b>Type</b>: {transport?.name}</p>
                        </div>
                        <div className="col">
                            <p><b>Empreinte carbone (en Km)</b>: {transport?.carbon_footprint}</p>
                        </div>
                    </div>
                    <h4 className="text-start mt-2">Empreinte carbone du producteur</h4>
                    <div className="form-group text-start">
                        <div className="col">
                            <p><b>Empreinte carbone en gramme par kg de produit</b>: {product?.carbon_footprint}</p>
                        </div>
                    </div>
                    <h4 className="text-start mt-2 border-top pt-2">Calcul du conso score</h4>

                    <div className="form-group text-start">
                        <label htmlFor="barcode">Numéro de code barre</label>
                        <input type="number" className="form-control w-50" id="barcode" placeholder="Numéro de code barre" />
                    </div>
                    <div className="form-group text-start">
                        <label htmlFor="seller_price">Prix (en €)</label>
                        <input type="number" className="form-control w-50" id="seller_price" placeholder="Votre prix de vente" aria-describedby="seller_price_helper" />
                        <small id="seller_price_helper" className="form-text text-muted">
                            Entrez votre prix de vente sans la taxe associée au conso score.
                        </small>
                    </div>
                    <div className="form-group text-start">
                        <label htmlFor="quantity">Quantité de produit</label>
                        <input type="number" className="form-control w-50" id="quantity" placeholder="Quantité" aria-describedby="quantity_helper" />
                        <small id="quantity_helper" className="form-text text-muted">
                            Correspond à la quantité de produit que vous avez en stock.
                        </small>
                    </div>
                    {renderResult(showRenderResult)}
                    <div>
                        <button type="submit" className="w-25"> Apply score</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AddSellerProduct