import React from 'react';
import { connect } from 'react-redux';
import { addLineItem, postOrder } from '../store/order';

const newLineItem = (props) => {
  console.log('newLineItem: ', props)
  console.log('event.target: ', event.target)
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <input type="number" name="quantity" min="0" max={props.selectedProduct.inventoryQuantity} />
        <button type="submit">Add to MyBag</button>
      </form>
    </div>
  )
}

const mapDispatch = (dispatch, ownProps) => {
  const newItem = ownProps.selectedProduct
  const userId = ownProps.user.id
  return {
   onSubmit: (event) => {
    event.preventDefault();
    const newLine = {
      quantity: event.target.quantity.value,
      price: newItem.price,
      productId: newItem.id,
      orderId: 1
    }
    const newOrder = {
      orderStatus: 'cart',
      totalOrderPrice: 0,
      totalOrderQuantity: 0,
      lineItem: newLineItem
    }

    dispatch(postOrder(userId, newOrder))
    console.log('newLine: ', newLine)
    event.target.quantity.value = 0;
    }
  }
}

const mapState = () => {
  return {
    quantity: 1
  }
}

export default connect(mapState, mapDispatch)(newLineItem)


//upon clicking add to bag, a new line item is created containing the quantity, and the productID.
//the productID can be found in the URL for that page.

