import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkSingleProduct } from '../store/product'

class SingleProduct extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.fetchProduct();
  }

  render() {
    let product = this.props.product
    console.log('single product props render: ', Array.isArray(product), product)
    return (
      <div className="container" "col-md-8">
        <img src={product.image} alt={product.title} />
        <ul>
          <li>${product.price}</li>
          <li>description: {product.description} </li>
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = Number(ownProps.match.params.id)
  console.log('mapping dispatch to props')
  return {
    fetchProduct: () => dispatch(thunkSingleProduct(id))
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  console.log('single product state: ', state)
  console.log('single product own props: ', ownProps)
  const singleProduct = state.product
 return {
  product: singleProduct
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
