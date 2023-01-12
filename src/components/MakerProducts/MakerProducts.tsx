import React from 'react';

import { ProductComponent } from './ProductComponent';
import { Product } from './ProductModel';
import ProductSearchBar from './ProductSearchBar';

type MakerProductsState = {
    sellerID: string
    makerName: string
    products: Product[]
    displayedProducts: Product[]
}

type MakerProductProps = {
    maker_name: string
}

class MakerProducts extends React.Component<MakerProductProps, MakerProductsState> {
    state: MakerProductsState = {
        sellerID: '',
        makerName: '',
        products: [],
        displayedProducts: [],
    }

    getMakerProducts(makerID: string) {

    }

    public componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search)

        fetch('http://localhost:9092/maker/' + queryParams.get("maker_id") + '/products')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    sellerID: queryParams.get("seller_id")!,
                    makerName: queryParams.get("maker_name")!,
                    products: data as Product[],
                    displayedProducts: data as Product[]
                })
            })
    }

    searchInputChangeCallback = (filteredProducts: Product[]) => {
        this.setState({
            displayedProducts: filteredProducts
        })

    }

    render() {
        return (
            <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between">
                    <h2 className="text-start"> {this.state.makerName} produits</h2>
                    <div>
                        <ProductSearchBar products={this.state.products} searchInputHandler={this.searchInputChangeCallback} />
                    </div>
                </div>
                <div >
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prix</th>
                                <th>Empreinte carbone</th>
                                <th>Unité</th>
                                <th>Détails</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.displayedProducts.map((product, index) => {
                                    return (
                                        <ProductComponent product={product} sellerID={this.state.sellerID} key={index} />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default MakerProducts;
