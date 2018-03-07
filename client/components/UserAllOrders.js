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
    let userId=this.props.userId;
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
                              <h5>
                                    Order ID : <span> { order.id }</span>
                             </h5>
                                <h5>
                                  <span> Order Status  :{ order.orderStatus }</span>
                                </h5>
                                <h5>
                                  <span> Total Order Price  :{ order.totalOrderPrice }</span>
                                </h5>
                                <h5>
                                  <span> Total Order Quantity  :{ order.totalOrderQuantity }</span>
                                </h5>
                                <small>lineitems : { order.lineitems.length }</small>
                              </div>
                            </Link>
                            <div>

                            <a  href="#" className="textColor">Remove</a>
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
<<<<<<< HEAD
  const userId = +ownProps.match.params.userId; 
=======
  const userId = +ownProps.match.params.userId;

>>>>>>> 27108e04c2cd72fdc38cd1fb120cf2edcc60501d
  return {
    order: state.order,
    userId: userId
  }
}

<<<<<<< HEAD
const mapDispatchToProps = (dispatch, ownProps) => {
=======

const mapDispatchToProps = (dispatch) => {
>>>>>>> 27108e04c2cd72fdc38cd1fb120cf2edcc60501d
  return {
    fetchOrders: () => dispatch(fetchAllOrdersByUserX(+ownProps.match.params.userId))
  }
}

<<<<<<< HEAD



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserAllOrders));
=======
export default connect(mapStateToProps, mapDispatchToProps)(UserAllOrders);
>>>>>>> 27108e04c2cd72fdc38cd1fb120cf2edcc60501d
