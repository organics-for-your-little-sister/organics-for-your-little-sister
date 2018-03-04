import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkSingleProduct, addLineItem } from '../store/product';
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
        <form>
          <NewLineItem className="quantity" onSubmit={this.props.handleSubmit} product={this.props.product} />
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
      console.log('submit', evt.target.form)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
