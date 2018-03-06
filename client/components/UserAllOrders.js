import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import store,{fetchAllOrdersByUserX} from '../store/order';

class UserAllOrders extends Component {
  componentDidMount() {
    console.log("1. componentDidMount");
    this.props.fetchOrders();
  }

  render() {
    let orders = this.props.order
    let userId=this.props.userId;
    console.log('!!!!!! INSIDE USERALLORDERS', orders);
    //console.log('userId in UserAllOrders'+this.props.userId);
    return (
      <div className="textColor">
        You are in The UserAllOrders
              <div className="order py-5 bg-light">
                <div className="container">
                  <div className="row">
                  {orders.length && orders.map(order => (
                      <div className="col-md-4" key={ order.id }>
                          <div className="card mb-4 box-shadow">
                            <NavLink to={`/account/orders/${userId}/singleOrder/${order.id}`}>
                            <img src='#' className="card-img-top"/>
                              <div className="caption">
                              <h5 className="textColor">
                                    Order ID : <span className="textColor"> { order.id }</span>
                             </h5>
                                <h5>
                                  <span className="textColor"> Order Status  :{ order.orderStatus }</span>
                                </h5>
                                <h5>
                                  <span className="textColor"> Total Order Price  :{ order.totalOrderPrice }</span>
                                </h5>
                                <h5>
                                  <span className="textColor"> Total Order Quantity  :{ order.totalOrderQuantity }</span>
                                </h5>
                                <small className="textColor">lineitems : { order.lineitems.length }</small>
                              </div>
                            </NavLink>
                            <div>
                            <a  href="#" className="textColor"> Remove</a>
                            </div>
                          </div>
                      </div>
                    ))
                  }
              </div>
            </div>
         </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(' Order state: ', state)
  console.log("5. mapStateToProps to get the state");
  const userId = +ownProps.match.params.userId; 
  //console.log('userId in UserAllOrders'+userId);

 return {
  order: state.order,
  userId: userId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('mapping dispatch to props')
  console.log("2. mapDispatchToProps");
  return {
    fetchOrders: () => dispatch(fetchAllOrdersByUserX(1))
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserAllOrders));
