import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../MakerProducts/ProductModel";

type AddSellerProductProps = {
    product: Product
}

type AddSellerProductState = {
    product: Product
}

type Category = {
    id: string
    name: string
    threshold: number
}

type Transport = {
    id: string
    name: string
    kilometer_carbon_footprint: number
}

type ConsoScore = {
    score: number
    tax: number
}

type LocationStateContainer = {
    product: Product
}

const AddSellerProduct = () => {
    function getCategory(): Category {
        return {
            id: "1",
            name: "Légume",
            threshold: 20
        }
    }

    function getTransport(): Transport {
        return {
            id: "2",
            name: "Camion",
            kilometer_carbon_footprint: 12
        }
    }

    const location = useLocation() || "unknown"
    const locationState = location.state as LocationStateContainer

    const [product, setProduct] = useState<Product>(locationState.product || undefined)
    const [category, setCategory] = useState<Category>(getCategory())
    const [transport, setTransport] = useState<Transport>(getTransport())
    const [consoScore, setConsoScore] = useState<ConsoScore>()

    const renderResult = (showResult: Boolean) => {
        if (showResult) {
            return (
                <div className="text-start">
                    <h3>Result</h3>
                    <p> You product conso score : {consoScore?.score}. The tax applied to your product corresponds to {consoScore?.tax}% of the selling price</p>
                </div>
            )
        }
    }

    return (
        <div className="container-fluid">
            <div className="row h-100">
                <form >
                    <div className="form-group row">
                        <div className="form-group col text-start">
                            <label htmlFor="category">Category</label>
                            <input type="text" readOnly className="form-control" id="category" placeholder="Category" value={category?.name} />
                        </div>
                        <div className="form-group col text-start">
                            <label htmlFor="price">Price</label>
                            <input type="number" readOnly className="form-control" id="price" placeholder="Price" value={product?.price || 1} />
                        </div>
                    </div>
                    <h3 className="text-start"> Transport information</h3>
                    <div className="form-group row">
                        <div className="form-group col text-start">
                            <label htmlFor="type">Type</label>
                            <input type="text" readOnly className="form-control" id="type" placeholder="Type" value={transport?.name} />
                        </div>
                        <div className="form-group col text-start">
                            <label htmlFor="carbon_fp" >Carbon footprint (by Km)</label>
                            <input type="text" readOnly className="form-control" id="carbon_fp" placeholder="Carbon footprint" value={transport?.kilometer_carbon_footprint} />
                        </div>
                    </div>
                    <h3 className="text-start">Maker carbon footprint</h3>
                    <div className="form-group text-start">
                        <label htmlFor="carbon_footprint_maker">Carbon foot print</label>
                        <input type="text" readOnly className="form-control" id="carbon_footprint_maker" placeholder="Carbon footprint" aria-describedby="maker_fp_description" value={product?.carbon_foot_print} />
                        <small id="maker_fp_description" className="form-text text-muted">
                            This corresponds to the carbon footprint of the product from maker side
                        </small>
                    </div>
                    <h3 className="text-start">Apply conso-score</h3>
                    <div className="form-group text-start">
                        <label htmlFor="barcode">Bar code number</label>
                        <input type="number" className="form-control" id="barcode" placeholder="Bar code number" />
                    </div>
                    <div className="form-group text-start">
                        <label htmlFor="seller_price">Price</label>
                        <input type="number" className="form-control" id="seller_price" placeholder="Your selling price" aria-describedby="seller_price_helper" />
                        <small id="seller_price_helper" className="form-text text-muted">
                            Input your selling price without the conso score tax applied
                        </small>
                    </div>
                    <div className="form-group text-start">
                        <label htmlFor="quantity">Quantity of products</label>
                        <input type="number" className="form-control" id="quantity" placeholder="Quantity" aria-describedby="quantity_helper" />
                        <small id="quantity_helper" className="form-text text-muted">
                            This corresponds to the quantity of this products that you have in your stock
                        </small>
                    </div>
                    {renderResult(true)}
                    <div>
                        <button> Apply score</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AddSellerProduct