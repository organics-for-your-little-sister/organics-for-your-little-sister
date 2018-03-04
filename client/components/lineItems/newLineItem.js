import React, { Component } from 'react';
import {connect} from 'react-redux';
import { thunkSingleProduct } from '../../store/product'


export class NewLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        clicks: 1
      }

      this.incramentItem = this.incramentItem.bind(this);
      this.decreaseItem = this.decreaseItem.bind(this);
    }

    incramentItem () {
      if(this.state.clicks < 1 || this.props.product.inventoryQuantity){
      this.setState({clicks: this.state.clicks + 1});
      }
    }

    decreaseItem () {
      if (this.state.clicks > 0) {
      this.setState({clicks: this.state.clicks - 1});
      }

    }
  render() {
    console.log('newLineItem props: ', this.props)
    console.log('newLineItemProps inventoryQuantity: ', this.props.product.inventoryQuantity)
    return (
      <div>
        <h3>Quantity</h3>
          <button onClick={this.incramentItem}>+</button>
            {this.state.clicks}
          <button onClick={this.decreaseItem}>-</button>
      </div>
    )
  }
}




//upon clicking add to bag, a new line item is created containing the quantity, and the productID.
//the productID can be found in the URL for that page.

