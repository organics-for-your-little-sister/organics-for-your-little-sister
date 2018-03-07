import React from 'react';
import { connect } from 'react-redux';
import { addLineItem, postOrder } from '../store/order';

const newLineItem = (props) => {
  return (
    <div>
      <input type="number" name="quantity" placeholder="0" min="0" max={props.selectedProduct.inventoryQuantity} />
      <button onClick={props.handleClick}
        type="button">
        Add to MyBag
      </button>
    </div>
  )
}


const mapState = (state) => {
  return {
    quantity: 1,
    user: state.user,
    order: state.order
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const newItem = ownProps.selectedProduct;
  const user = ownProps.user;

  return {
    handleClick: () => {
    const newOrder = {
      orderStatus: 'orderComplete',
      userId: user.id,
  }
       dispatch(postOrder(newOrder))
       .then((createdOrderAction) => {
         const newline = {
          quantity: 1,
          price: newItem.price,
          productId: newItem.id,
          orderId: createdOrderAction.order.id
        }
          dispatch(addLineItem(createdOrderAction.order.id, newline))
       })
    }
  }
}


export default connect(mapState, mapDispatch)(newLineItem)


