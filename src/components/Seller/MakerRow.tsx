import React from "react";
import { Maker } from "./MakerModel";

type MakerRowProps = {
  maker: Maker
}

export default class MakerRow extends React.Component<MakerRowProps, {}> {
  goToProductList(id: string) {
    window.location.assign("/maker/" + id + "/products?maker_name=" + this.props.maker.name)
  }

  render() {
    return (
      <tr className="clickable-row" onClick={() => this.goToProductList(this.props.maker.id)}>
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
