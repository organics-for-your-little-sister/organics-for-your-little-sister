import React from 'react';
import {connect} from 'react-redux';

class newLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        clicks: 0,
        show: true
      };
    }
  render() {
    return (
      <div>
        <h3>Quantity</h3>
          <button onClick={this.incramentItem}>+</button>
          <input className="quantity">{this.state.clicks}</input>
          <button onClick={this.decreaseItem}>-</button>
      </div>
    )
  }
}

    incramentItem = () => {
      this.setState({clicks: this.state.clicks + 1});
    }

    decreaseItem = () => {
      this.setState({clicks: this.state.clicks - 1});
    }


//upon clicking add to bag, a new line item is created containing the quantity, and the productID.
//the productID can be found in the URL for that page.

export default newLineItem;
