import React from "react";
import { Product } from "./ProductModel";

type ProductComponentProps = {
    product: Product
}

export class ProductComponent extends React.Component<ProductComponentProps, {}> {
    computeConsoScore() {

    }
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
                    <button onClick={this.computeConsoScore}>Add product</button>
                </td>
            </tr>
        );
    }
}