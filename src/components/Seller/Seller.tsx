import React from "react";
import MakerRow from "./MakerRow";
import { Maker } from "./MakerModel";
import { MakersSearchBar } from "./MakersSearchBar";

type SellerState = {
    makers: Maker[],
    displayedMakers: Maker[]
}

export default class Seller extends React.Component<{}, SellerState> {
    state: SellerState = {
        makers: [],
        displayedMakers: []
    }

    public componentDidMount() {
        this.setState({
            makers: [
                {
                    id: "2e6652c2-91b3-4857-a7fc-990953690a2d",
                    name: "Jean",
                    location: "1 rue de Bou, 14000, Caen"
                },
                {
                    id: "bec62b34-d01b-45a6-9a8a-bf9a02964453",
                    name: "Michel",
                    location: "2 rue de Bra, Parus"
                }
            ],
            displayedMakers: [
                {
                    id: "2e6652c2-91b3-4857-a7fc-990953690a2d",
                    name: "Jean",
                    location: "1 rue de Bou, 14000, Caen"
                },
                {
                    id: "bec62b34-d01b-45a6-9a8a-bf9a02964453",
                    name: "Michel",
                    location: "2 rue de Bra, Parus"
                }
            ],
        })
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
                                <th>Name</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.displayedMakers.map((maker, index) => {
                                return (<MakerRow maker={maker} key={index} />)
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}