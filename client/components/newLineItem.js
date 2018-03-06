import React from 'react';
import { connect } from 'react-redux';
import { addLineItem, postOrder, putOrder } from '../store/order';

const newLineItem = (props) => {
  console.log('PROPS:    !!! ', props)
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

const mapState = (state, ownProps) => {
  return {
    quantity: 1,
    user: state.user,
    order: state.order
  }
}
//.filter( aOrder => aOrder.userId === state.user.id )

const mapDispatch = (dispatch, ownProps) => {
  console.log('this is ownProps ', ownProps);
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
          console.log('inside postOrder.then', createdOrderAction)
          dispatch(addLineItem(createdOrderAction.order.id, newline))

          .then((createdLineItem) => {
            console.log('inside lineitem.then', createdLineItem)
          })
       })
    }
  }
}


export default connect(mapState, mapDispatch)(newLineItem)


//upon clicking add to bag, a new line item is created containing the quantity, and the productID.
//the productID can be found in the URL for that page.

