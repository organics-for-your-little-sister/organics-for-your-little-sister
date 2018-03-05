import React, { Component } from 'react'
import {connect} from 'react-redux';
import {thunkAllProducts, thunkNewProduct} from '../store/product';

class AllProducts extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.thunkAllProducts();
  }
  render() {
    const products = this.props.products;
  return (
    <div className="allProductsContainer">
      {console.log(this.props)}
      { products && products.map( product => {
        return (
          <div key={product.id} className="product">
            <h2 className="title">{product.title}</h2>
            <img src={product.image} alt={product.title} />
          <ul>
            <li>category: {product.category}</li>
            <li>description: {product.description}</li>
          </ul>
            <h3>${product.price}</h3>
            <button onClick={this.props.handleClick}>Add to Cart</button>
        </div>)
      })}
    </div>
    )
  }
}

const mapState = (state) => {
  return {
    hello: 'hello world',
    products: state.product
  }
}

const mapDispatch = (dispatch) => {
  return {
    thunkAllProducts: () => dispatch(thunkAllProducts()),
    handleClick : () => console.log('hello world')
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
