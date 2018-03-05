import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import store from '../store/lineItem';

class MyBag extends Component {

  render(){
    console.log(this.props.lineItemArray);
    const lineItems = this.props.lineItemArray || [];
    const subtotal = lineItems.reduce((accu, curr) => {return accu.subtotal + curr.subtotal}, 0);

    return (
      <div>
        <div>
          <h3>My Bag</h3>

          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-condensed">

                <thead>
                  <tr>
                    <td><strong>{lineItems.length} Item(s)</strong></td>
                    <td className="text-center"><strong>Price</strong></td>
                    <td className="text-center"><strong>Quantity</strong></td>
                    <td className="text-right"><strong>Total</strong></td>
                  </tr>
                </thead>
                
                <tbody>

                  {
                    lineItems.length && lineItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.title} {item.image}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.subtotal}</td>
                      </tr>
                    ))
                  }

                  <tr>
                    <td className="highrow"></td>
                    <td className="highrow"></td>
                    <td className="highrow text-center"><strong>Subtotal</strong></td>
                    <td className="highrow text-right">{subtotal}</td>
                  </tr>
                  <tr>
                    <td className="emptyrow"></td>
                    <td className="emptyrow"></td>
                    <td className="emptyrow text-center"><strong>Shipping</strong></td>
                    <td className="emptyrow text-right">Free</td>
                  </tr>
                  <tr>
                    <td className="emptyrow"><i className="fa fa-barcode iconbig"></i></td>
                    <td className="emptyrow"></td>
                    <td className="emptyrow text-center"><strong>Total</strong></td>
                    <td className="emptyrow text-right">{subtotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    lineItemArray: state.order.lineitems
  }
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
  return {

  }
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyBag));
