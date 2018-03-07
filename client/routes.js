import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {me, fetchAllOrdersByUserX, fetchSingleOrderByUserX, thunkAllProducts} from './store'
import {Login, Signup, UserHome, AccountInfo, AllProducts, SideBar, SingleProduct, ProductsByCategory, UserAllOrders, UserSingleOrder, MyBag, Checkout} from './components'

class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
   const {isLoggedIn} = this.props
    //The above correct look in the db for the admin user to login - hint, her last name starts w/ a k
    console.log(isLoggedIn)

    return (
      <Switch>
        <Route exact path="/account"  component={AccountInfo} />
        <Route exact path="/account/orders/:userId"  component={UserAllOrders} />
        <Route exact path="/account/orders/:userId/singleOrder/:orderId"  component={UserSingleOrder} />
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/category/:categoryName" component={ProductsByCategory} />
        <Route path="/mybag" component={MyBag} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/products/:id" component={SingleProduct} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={AllProducts} />
            </Switch>
        }
        {/* Displays our AllProducts component as a fallback */}
        <Route component={AllProducts} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    order: state.order
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchAllOrdersByUserX(1))
      dispatch(thunkAllProducts())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
