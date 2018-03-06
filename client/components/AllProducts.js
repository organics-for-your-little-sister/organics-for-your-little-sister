import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {thunkAllProducts} from '../store/product';
import { NewLineItem } from './index'


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
            <Link to={`/products/${product.id}`}><h2 className="title textColor">{product.title}</h2></Link>
            <img src={product.image} alt={product.title} />
          <ul>
            <li className="textColor">{product.category} tampon</li>
          </ul>
            <h3 className="textColor">${product.price}</h3>
            <NewLineItem selectedProduct={product} />
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
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
