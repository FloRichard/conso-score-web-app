import React from "react";
import { Product } from "./ProductModel";

type MakerProductDetailProps = {
    product: Product
}

export class Seller extends React.Component<MakerProductDetailProps, {}> {
    render() {
        return (
            <div className="d-flex flex-column">

            </div>
        )
    }
}