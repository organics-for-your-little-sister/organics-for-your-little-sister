import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkSingleProduct } from '../store/product';
import { addLineItem } from '../store/lineItem';
import { NewLineItem } from './lineItems/newLineItem';

class SingleProduct extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.fetchProduct();
  }

  render() {
    let product = this.props.product
    return (
    <div>
      <div className="container center col-md-8">
        <h3>{product.title}</h3>
        <img src={product.image} alt={product.title} />
        <ul>
          <li>${product.price}</li>
          <li>description: {product.description} </li>
        </ul>
      </div>
      <div className="container right col-md-4">
        <form onSubmit={this.props.handleSubmit}>
          <NewLineItem className="quantity" product={this.props.product} />
          <p/>
          <button onChange={this.props.handleChange}>submit</button>
        </form>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
 return {
  product: state.product
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = Number(ownProps.match.params.id)
  return {
    fetchProduct: () => dispatch(thunkSingleProduct(id)),
    handleChange (evt) {
      console.log('value ', evt.target.value)
      dispatch(addLineItem(evt.target.value))
    },
    handleSubmit (evt) {
      evt.preventDefault();
      const newLineItem = {
        quantity: evt.target.quantity.value,
        price: price,
        productId: id
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
