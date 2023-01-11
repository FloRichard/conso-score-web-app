import React from "react";
import { ProductComponent } from "./ProductComponent";
import { Product } from "./ProductModel";
import ProductSearchBar from "./ProductSearchBar";

type MakerProductsState = {
    makerName: string
    products: Product[]
    displayedProducts: Product[]
}

type MakerProductProps = {
    maker_name: string
}

export class MakerProducts extends React.Component<MakerProductProps, MakerProductsState> {
    state: MakerProductsState = {
        makerName: '',
        products: [],
        displayedProducts: [],
    }

    public componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search)

        this.setState({
            makerName: queryParams.get("maker_name")!,
            products: [
                {
                    id: 'e619eb30-0e55-4c68-ab60-1fdf77dcc0b4',
                    name: 'Carotte',
                    price: 2,
                    carbon_foot_print: 0.10,
                    quantity_unity: 'Kg',
                    category_id: 'acc5c48a-a2c0-4806-a9a8-5be2c0c3adf5',
                    expedition_transport_id: '3f92b72c-8695-49f1-9b11-686b303db618',
                },
                {
                    id: 'a83c2c3a-01e0-42dd-a42c-0241df3112a4',
                    name: 'Viandasse',
                    price: 30,
                    carbon_foot_print: 8,
                    quantity_unity: 'Kg',
                    category_id: 'acc5c48a-a2c0-4806-a9a8-5be2c0c3adf5',
                    expedition_transport_id: '3f92b72c-8695-49f1-9b11-686b303db618',
                }
            ],
            displayedProducts: [
                {
                    id: 'e619eb30-0e55-4c68-ab60-1fdf77dcc0b4',
                    name: 'Carotte',
                    price: 2,
                    carbon_foot_print: 0.10,
                    quantity_unity: 'Kg',
                    category_id: 'acc5c48a-a2c0-4806-a9a8-5be2c0c3adf5',
                    expedition_transport_id: '3f92b72c-8695-49f1-9b11-686b303db618',
                },
                {
                    id: 'a83c2c3a-01e0-42dd-a42c-0241df3112a4',
                    name: 'Viandasse',
                    price: 30,
                    carbon_foot_print: 8,
                    quantity_unity: 'Kg',
                    category_id: 'acc5c48a-a2c0-4806-a9a8-5be2c0c3adf5',
                    expedition_transport_id: '3f92b72c-8695-49f1-9b11-686b303db618',
                }
            ],
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
                    <h2 className="text-start"> {this.state.makerName} products</h2>
                    <div>
                        <ProductSearchBar products={this.state.products} searchInputHandler={this.searchInputChangeCallback} />
                    </div>
                </div>
                <div >
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Carbon footprint</th>
                                <th>Quantity Unity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.displayedProducts.map((product, index) => {
                                    return (
                                        <ProductComponent product={product} key={index} />
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