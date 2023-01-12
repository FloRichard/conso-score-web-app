import React from "react";
import { Maker } from "./MakerModel";
import '../css/tr.css'
type MakerRowProps = {
  maker: Maker
  sellerID: string
}

export default class MakerRow extends React.Component<MakerRowProps, {}> {
  goToProductList(id: string) {
    window.location.assign("/maker/products?maker_name=" + this.props.maker.name + "&maker_id=" + id + "&seller_id=" + this.props.sellerID)
  }

  render() {
    return (
      <tr className="clickable-row clickable-tr" onClick={() => this.goToProductList(this.props.maker.id)}>
        <td>
          {this.props.maker.name}
        </td>
        <td>
          {this.props.maker.location}
        </td>
      </tr>
    );
  }
}
