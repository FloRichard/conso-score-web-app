import React from "react";
import { Link } from "react-router-dom";
import { Product } from "./ProductModel";
import '../css/tr.css'
type ProductComponentProps = {
    product: Product
    sellerID: string
}

export class ProductComponent extends React.Component<ProductComponentProps, {}> {
    goToProductDetail() {
        const LinkComponent = document.getElementById(this.props.product.product_id)
        LinkComponent?.click()
    }
    render() {
        return (
            <tr className="clickable-row clickable-tr" onClick={() => this.goToProductDetail()}>
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

                <Link id={this.props.product.product_id} to={`/seller/${this.props.product.product_id}/add_product`} state={{ product: this.props.product, seller_id: this.props.sellerID }} hidden> </Link>

            </tr>
        );
    }
}