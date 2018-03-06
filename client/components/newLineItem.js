import React from 'react';
import { connect } from 'react-redux';
import { addLineItem } from '../../store/lineItem';


const newLineItem = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}
        type="button">
        Add to MyBag
      </button>
    </div>
  )
}

const mapDispatch = (dispatch, ownProps) => {
  const newItem = ownProps.selectedProduct
  const newline = {
    quantity: 1,
    price: newItem.price,
    productId: newItem.id
  }
  return {
    handleClick: () => dispatch(addLineItem(newline))
  }
}


// const incramentItem = (props) => {
//   if (count < 1 || props.selectedProduct.inventoryQuantity) {
//     count++
//   }
//    quantity = count
// }

// const decrementItem = () => {
//   if (count > 0) {
//     count--
//   }
//    quantity = count
// }

export default connect(null, mapDispatch)(newLineItem)



//upon clicking add to bag, a new line item is created containing the quantity, and the productID.
//the productID can be found in the URL for that page.

