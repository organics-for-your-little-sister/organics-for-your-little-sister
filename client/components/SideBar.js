import React from 'react';
import { connect } from 'react-redux';
import { thunkCategoryList } from '../store/product'
import {Link} from 'react-router-dom'


const SideBar = (props) => {
  const categoryObj = props.products.reduce((a, b) => { a[b.category] ? a[b.category]++ : a[b.category] = 1; return a }, {})
  // FYI, categoryObj = {cotton: 3, luxury: 2, ..., categoryName: productNum}
  const categoryArr = Object.keys(categoryObj)

  return (
    <div>
      <div className="sidenav">
        <Link to="/"><h3>HOME</h3></Link>
        <h3>Categories</h3>
        <ul>
        <Link to="/products"><li>all</li></Link>
          {
            categoryArr && categoryArr.map(category => {
              return <Link  key={category} to={`/products/category/${category}`} ><li>{category}</li></Link >
            })
          }
        </ul>


      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    products: state.product
  }
}


export default connect(mapState)(SideBar);
