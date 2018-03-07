import React from 'react';
import { connect } from 'react-redux';
import { addLineItem, postOrder } from '../store/order';

const newLineItem = (props) => {

  return (
    <div>
      <input type="number" name="quantity" placeholder="0" min="0" max={props.selectedProduct.inventoryQuantity} />
      <button onClick={props.handleClick}
        type="button">
        Add to Bag
      </button>
    </div>
  )
}

// const dirty = this.state.dirty
//       let warning = '';
//       if (!this.state.inputValue.length && dirty) warning = 'You must enter a name';
//       else if (this.state.inputValue.length > 16) warning = 'Name must be less than 16 characters';


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


