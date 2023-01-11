import React from "react";
import { Product } from "./ProductModel";

type ProductSearchBarProps = {
    products: Product[]
    searchInputHandler: (filteredProducts: Product[]) => void
}

export default class ProductSearchBar extends React.Component<ProductSearchBarProps, {}> {
    filterproducts = (e: React.ChangeEvent<HTMLInputElement>) => {
        const makerName = e.target.value.toLowerCase()
        const filteredproducts = this.props.products.filter(
            maker => maker.name.toLowerCase().includes(makerName)
        )
        this.props.searchInputHandler(filteredproducts)
    }
    render() {
        return (
            <div className="input-group rounded">
                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={this.filterproducts} />
                <span className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search"></i>
                </span>
            </div>
        )
    }
}