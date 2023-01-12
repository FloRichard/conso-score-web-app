import React from "react";
import { Link } from "react-router-dom";
import { Product } from "./ProductModel";

type ProductComponentProps = {
    product: Product
    sellerID: string
}

export class ProductComponent extends React.Component<ProductComponentProps, {}> {
    render() {
        return (
            <tr>
                <td>
                    {this.props.product.name}
                </td>
                <td>
                    {this.props.product.price}
                </td>
                <td>
                    {this.props.product.carbon_footprint}
                </td>
                <td>
                    {this.props.product.quantity_unity}
                </td>
                <td>
                    <Link to={`/seller/${this.props.product.product_id}/add_product`} state={{ product: this.props.product, seller_id: this.props.sellerID }}> Add product </Link>
                </td>
            </tr>
        );
    }
}