import React from 'react'
import { connect } from 'react-redux'
import { thunkProductsByCategory } from '../store/product'

const ProductByCategory = (props) => {
  const theProducts = props.products
  return (
    <div className="allProductsContainer">
      {
        theProducts && theProducts.map(aProduct => {
          return <div key={aProduct.id} className="product">
            <img src={aProduct.image} alt={aProduct.title} />
            <ul>
              <li>${aProduct.price}</li>
              <li>description: {aProduct.description} </li>
            </ul>

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

export default connect(mapState)(ProductByCategory)
