import React from 'react';
import { connect } from 'react-redux';
import { addLineItem } from '../../store/lineItem';

const newLineItem = (props) => {
  const selectedProduct = props.selectedProduct
  console.log(selectedProduct)
  return (
    <div className="btn-group">
      <button onSubmit={(selectedProduct) => props.handleClick(selectedProduct)}
        type="button"
        className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Add to MyBag
      </button>
    </div>
  )
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleClick : (item) => dispatch(addLineItem(item))
  }
}


export default connect(null, mapDispatch)(newLineItem)


//upon clicking add to bag, a new line item is created containing the quantity, and the productID.
//the productID can be found in the URL for that page.
