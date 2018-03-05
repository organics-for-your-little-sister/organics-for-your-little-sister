import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkSingleProduct } from '../store/product'
import { NewLineItem } from './index'

const SingleProduct = (props) => {
  let product = props.product
  console.log(product)
  return (
    <div>
      {
        product &&
        <div className="product">
          <img src={product.image} alt={product.title} />
          <ul>
            <li className="title">title: {product.title}</li>
            <li>${product.price}</li>
            <li>description: {product.description} </li>
          </ul>
          <NewLineItem selectedProduct={product}/>
        </div>

      }
    </div>
  )
}


const mapStateToProps = (state, ownProps) => {
  const id = +ownProps.match.params.id
  return {
    products: state.product,
    product: state.product.find(aProduct => aProduct.id === id)
  }
}


export default connect(mapStateToProps)(SingleProduct);
