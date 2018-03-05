import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { thunkProductsByCategory } from '../store/product'
import { NewLineItem } from './index'

const ProductByCategory = (props) => {
  const theProducts = props.products
  return (
    <div className="allProductsContainer">
      {
        theProducts && theProducts.map(aProduct => {
          return <div key={aProduct.id} className="product">
            <img src={aProduct.image} alt={aProduct.title} />
            <Link to={`/products/${aProduct.id}`}><h2 className="title">{aProduct.title}</h2></Link>
            <ul>
              <li>${aProduct.price}</li>
              <li>description: {aProduct.description} </li>
            </ul>
            <NewLineItem />

          </div>
        })
      }
    </div>
  )
}

const mapState = (state, ownProps) => {
  const categoryName = ownProps.match.params.categoryName
  return {
    products: state.product.filter(aProduct => aProduct.category === categoryName)
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}
export default connect(mapState)(ProductByCategory)
