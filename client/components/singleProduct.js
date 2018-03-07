import React from 'react';
import { connect } from 'react-redux';
import { NewLineItem } from './index'

const SingleProduct = (props) => {
  let product = props.product
  return (
    <div className="allProductsContainer">
      {
        product &&
        <div className="textColor product">
          <img src={product.image} alt={product.title} />
          <ul>
            <li className="title textColor"><h2>{product.title}</h2></li>
            <li className="textColor">${product.price}</li>
            <li className="textColor">{product.description} </li>
            <li className="textColor">Rating: {product.avgRating} out of 5 stars</li>
          </ul>
          <NewLineItem selectedProduct={product} user={props.user} />
          <div>
          {
              product.reviews.map(review => {
                return (
                  <p className="textColor" key={review.id}>{`Reviews: ${review.reviewText}`}</p>
                )
              })
          }
          </div>
        </div>
      }
    </div>
  )
}


const mapStateToProps = (state, ownProps) => {
  const id = +ownProps.match.params.id
  return {
    products: state.product,
    product: state.product.find(aProduct => aProduct.id === id),
    user: state.user
  }
}


export default connect(mapStateToProps)(SingleProduct);
