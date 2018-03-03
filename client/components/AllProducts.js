import React from 'react'
import {connect} from 'react-redux';
import {thunkAllProducts, thunkNewProduct} from '../store/product';

const AllProducts = (props) => {
  const products = props.products;
  return (
    <div>
      {console.log(props)}
      { products && products.map( product => {
        return (
          <div key={product.id} className="product">
            <h2>{product.title}</h2>
          <ul>
            <li>{product.category}</li>
            <img src={product.image} alt={product.title} />
            <li>{product.description}</li>
            <li>${product.price}</li>
            <button onClick={props.handleClick}>Add to Cart</button>

          </ul>
        </div>)
      })}
    </div>
  )
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
