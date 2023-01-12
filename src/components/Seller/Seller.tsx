import React from 'react';

import { Maker } from './MakerModel';
import MakerRow from './MakerRow';
import { MakersSearchBar } from './MakersSearchBar';

type SellerState = {
    makers: Maker[],
    displayedMakers: Maker[]
}

type SellerProps = {
    seller_id: string
}

export default class Seller extends React.Component<SellerProps, SellerState> {
    state: SellerState = {
        makers: [],
        displayedMakers: []
    }
    getSellerMakers() {
        fetch('http://localhost:9092/seller/' + this.props.seller_id + '/makers')
            .then(res => res.json())
            .then(data => {
                const newState: SellerState = {
                    makers: data as Maker[],
                    displayedMakers: data as Maker[]
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
            < div className="d-flex flex-column" >
                <div className="d-flex flex-row justify-content-between">
                    <h2 className="text-start"> Makers list</h2>
                    <div>
                        <MakersSearchBar makers={this.state.makers} searchInputHandler={this.searchInputChangeCallback} />
                    </div>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Localisation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.displayedMakers.map((maker, index) => {
                                return (<MakerRow maker={maker} sellerID={this.props.seller_id} key={index} />)
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}