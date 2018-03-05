import React from 'react';
import { connect } from 'react-redux';
import { thunkCategoryList } from '../store/product'
import {Link} from 'react-router-dom'


const SideBar = (props) => {
  const categoryArr = ['cotton', 'animal fiber', 'luxury']
  return (
    <div>
      <div className="sidenav">
        <Link to="/"><h3>HOME</h3></Link>
        <h3>Categories</h3>
        <ul>
        <Link to="/products"><li>all</li></Link>
          {
            categoryArr && categoryArr.map(category => {
              return <Link  key={category} to={`/products/category/${category}`} ><li>{category}</li></Link>
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
