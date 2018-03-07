import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../store';
import { Link } from 'react-router-dom';


// set up a mybag reducer so it has a state

class MyBag extends Component { // a function would be sufficient

  render() {
    const lineItems = this.props.lineItemArray || [];
    const subtotal = lineItems.map(item => item.subtotal).reduce((accu, curr) => accu + curr, 0);

    return (
      <div>
        <div className="myBag">
          <h3 className="textColor">My Bag</h3>

          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-condensed">

                <thead>
                  <tr>
                    <td><strong className="textColor">{lineItems.length} Item(s)</strong></td>
                    <td className="text-center textColor"><strong>Price</strong></td>
                    <td className="text-center textColor"><strong>Quantity</strong></td>
                    <td className="text-right textColor"><strong>Total</strong></td>
                  </tr>
                </thead>

                <tbody>

                  <tr>
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
                  </tr>

                  <tr>
                    <td className="highrow"></td>
                    <td className="highrow"></td>
                    <td className="highrow text-center textColor"><strong>Subtotal</strong></td>
                    <td className="highrow text-right">{subtotal}</td>
                  </tr>
                  <tr>
                    <td className="emptyrow"></td>
                    <td className="emptyrow"></td>
                    <td className="emptyrow text-center textColor"><strong>Shipping</strong></td>
                    <td className="emptyrow text-right">Free</td>
                  </tr>
                  <tr>
                    <td className="emptyrow"><i className="fa fa-barcode iconbig"></i></td>
                    <td className="emptyrow"></td>
                    <td className="emptyrow text-center textColor"><strong>Total</strong></td>
                    <td className="emptyrow text-right textColor">{subtotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-right">
            <Link to="/checkout">Checkout</Link>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lineItemArray: state.order.lineitems
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBag);
