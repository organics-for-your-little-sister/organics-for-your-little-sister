import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { NewLineItem } from './index'

const ProductByCategory = (props) => {
  const theProducts = props.products
  return (
    <div className="allProductsContainer">
      {
        theProducts && theProducts.map(aProduct => {
          return <div key={aProduct.id} className="product textColor">
            <img src={aProduct.image} alt={aProduct.title} />
            <Link to={`/products/${aProduct.id}`}><h2 className="title">{aProduct.title}</h2></Link>
            <ul>
              <li className="textColor">${aProduct.price}</li>
              <li className="textColor">description: {aProduct.description} </li>
            </ul>
            <NewLineItem selectedProduct={aProduct} user={props.user} />

          </div>
        })
      }
    </div>
  )
}

const mapState = (state, ownProps) => {
  const categoryName = ownProps.match.params.categoryName
  return {
    products: state.product.filter(aProduct => aProduct.category === categoryName),
    user: state.user
  }
}

export default connect(mapState)(ProductByCategory)
