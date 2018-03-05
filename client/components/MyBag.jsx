import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import store from '../store/order';
// import newLineItem from './lineItems/newLineItem'

class MyBag extends Component {

  render(){
    return (
      <div>
        <div>
          <h3>My Bag</h3>
          <div>
            <table className='table'>
              <thead>
                <tr>
                  <th>LineItem ID</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>ProductId</th>
                </tr>
              </thead>
              <tbody>
                {
                  lineItemsArray.map(item => (
                      <tr key={item.id}>
                          <td>{item.id }</td>
                          <td>{item.price }</td>
                          <td>{item.quantity}</td>
                          <td>{item.productId }</td>
                       </tr>
                  ))
                }
              </tbody>
            </table>   
          </div> 

        </div>

      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
  order: state.order,
  lineItemsArray: state.order.lineitems
  }
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
  const userId= Number(ownProps.match.params.userId) 
  const orderId= Number(ownProps.match.params.orderId) 
  console.log('userId'+userId);
  console.log('orderId'+orderId);
  console.log('mapping dispatch to props')
  console.log("2. mapDispatchToProps");
  return {
    fetchSingleOrder: () => dispatch(fetchSingleOrderByUserX(userId,orderId))
  }
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyBag));
