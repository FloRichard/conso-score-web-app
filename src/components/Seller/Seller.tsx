import React from "react";
import MakerRow from "./MakerRow";
import { Maker } from "./MakerModel";
import { MakersSearchBar } from "./MakersSearchBar";

type SellerState = {
    makers: Maker[],
    displayedMakers: Maker[],
    sellerID: string
}


export default class Seller extends React.Component<{}, SellerState> {
    state: SellerState = {
        makers: [],
        displayedMakers: [],
        sellerID: localStorage.getItem('entity_id')!
    }
    getSellerMakers() {
        fetch('http://localhost:9092/seller/' + this.state.sellerID + '/makers')
            .then(res => res.json())
            .then(data => {
                const newState: SellerState = {
                    makers: data as Maker[],
                    displayedMakers: data as Maker[],
                    sellerID: this.state.sellerID
                }
                this.setState(newState)
            })
    }


    public componentDidMount() {

        this.getSellerMakers()
    }

    searchInputChangeCallback = (filteredMakers: Maker[]) => {
        this.setState({
            displayedMakers: filteredMakers
        })

    }

    public render() {
        return (
            <div className="container h-100 d-flex flex-column mt-5" >
                <div className="d-flex flex-row justify-content-between">
                    <h2 className="text-start">Producteurs partenaires</h2>
                    <div>
                        <MakersSearchBar makers={this.state.makers} searchInputHandler={this.searchInputChangeCallback} />
                    </div>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Adresse</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.displayedMakers.map((maker, index) => {
                                return (<MakerRow maker={maker} sellerID={this.state.sellerID} key={index} />)
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}