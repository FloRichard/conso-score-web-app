import React, { useEffect } from "react";
import { Maker } from "./maker";

type maker = {
    id: string,
    name: string,
    location: string
}

type SellerState = {
    makers: maker[]
}

export class Seller extends React.Component<{}, SellerState> {
    state: SellerState = {
        makers: []
    }
    public componentDidMount(){
        this.setState({makers: [
            {
                id: "2e6652c2-91b3-4857-a7fc-990953690a2d",
                name: "Jean",
                location: "1 rue de Bou, 14000, Caen"
            },
            {
                id: "bec62b34-d01b-45a6-9a8a-bf9a02964453",
                name: "Michel",
                location:"2 rue de Bra, Parus"
            }
        ]})
    }

    public goToMakerDetail(makerID: string) {

    }
    

    public render(){
        return(
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.makers.map((maker, index)=>{
                                    return ( <Maker 
                                        name={maker.name} 
                                        location={maker.location} 
                                        id={maker.id} 
                                        key={index}
                                    /> )})
                            }
                        </tbody>
                    </table>
                </div>
        )
    }

}

export default Seller