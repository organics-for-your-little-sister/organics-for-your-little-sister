import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllOrdersByUserX} from '../store/order';

class UserAllOrders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    let orders = this.props.order
    let userId = this.props.userId;
    return (
      <div className="textColor">
        Your Orders
              <div className="userOrder">
                <div className="container" >
                  <div className="row">
                  {orders.length && orders.map(order => (
                      <div className="col-md-6" key={ order.id }>
                          <div className="card mb-4 box-shadow">
                            <Link to={`/account/orders/${userId}/singleOrder/${order.id}`}>
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
                            </Link>
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
  const userId = +ownProps.match.params.userId;

  return {
    order: state.order,
    userId: userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchAllOrdersByUserX(1))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAllOrders);
