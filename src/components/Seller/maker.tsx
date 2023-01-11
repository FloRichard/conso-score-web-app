import React from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
type MakerProps = {
  name: string
  location: string
  id: string
};

export class Maker extends React.Component<MakerProps, {}> {
  goToProductList(){
    console.log("coucou")
     let navigate = useNavigate()
     navigate("/")
    // let navigate = useNavigate(); 
    // navigate(`/maker/${this.props.id}/products`)
    
  }
  render() {
    return (
      <tr className="clickable-row" onClick={this.goToProductList}>
        <td>
          {this.props.name} 
        </td>
        <td>
          {this.props.location}
        </td>
        {/* <td>
          <Link to={`/maker/${this.props.id}/products`} >go</Link>
        </td> */}
      </tr>
    );
  }
}
