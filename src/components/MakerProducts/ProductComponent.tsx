import React from "react";
import { Link } from "react-router-dom";
import { Product } from "./ProductModel";

type ProductComponentProps = {
    product: Product
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
                    {this.props.product.carbon_foot_print}
                </td>
                <td>
                    {this.props.product.quantity_unity}
                </td>
                <td>
                    <Link to={`/seller/${this.props.product.id}/add_product`} state={{ product: this.props.product }}> Add product </Link>
                </td>
            </tr>
        );
    }
}