import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import store,{fetchSingleOrderByUserX} from '../store/order';

class UserSingleOrder extends Component {
    componentDidMount() {
      console.log(this.props);  
      this.props.fetchSingleOrder();
    }
  
    render() {
      let order = this.props.order
      let lineItemsArray = this.props.order.lineitems || [];
      
      console.log(' UserSingleOrder props render: ', Array.isArray(lineItemsArray), lineItemsArray)
      return (
           <div>  
                <div>
                    <h3>Your Order</h3>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Order Id :</label>
                        <div className="col-sm-10">
                        {order.id}
                        </div>
                        <label className="col-sm-2 col-form-label">Order Status :</label>
                        <div className="col-sm-10">
                        {order.orderStatus}
                        </div>
                        <label className="col-sm-2 col-form-label">Total Order Price :</label>
                        <div className="col-sm-10">
                        {order.totalOrderPrice}
                        </div>
                        <label className="col-sm-3 col-form-label">Total Order Quantity :</label>
                        <div className="col-sm-6">
                        {order.totalOrderQuantity}
                        </div>
                    </div>
                </div>
                <div>
                        <table className = 'table' >
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
  const userId = +ownProps.match.params.userId;
  const orderId = +ownProps.match.params.orderId;

  return {
    fetchSingleOrder: () => dispatch(fetchSingleOrderByUserX(userId,orderId))
  }
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserSingleOrder));
