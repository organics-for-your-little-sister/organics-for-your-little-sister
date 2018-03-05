import React from 'react';
import {connect} from 'react-redux';

class newLineItem extends Component {
  constoructor(props) {
    super(props);
  }
  render() {
    return (
      <div className = "btn-group">
        <button
        type="button"
        className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        </button>
      </div>
    )
  }
}



//upon clicking add to bag, a new line item is created containing the quantity, and the productID.
//the productID can be found in the URL for that page.
