import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = (props) => (
  <div>
    <h1 className="textColor">Organics For Your Little Sister</h1>
    <nav>
      {
        props.isLoggedIn ? (
        <div className="textColor">
          {/* The navbar will show these links after you log in */}
          <Link className="textColor" to="/home">Welcome, {props.userFirstName}!</Link>
          <Link className="textColor" to="/mybag">My Bag</Link>
          <Link className="textColor" to="/account">Account</Link>
          <Link className="textColor" to="/home" onClick={props.handleClick}>
            Logout
          </Link>
        </div>
      ) : (
        <div className="textColor">
          {/* The navbar will show these links before you log in */}
          <Link className="textColor" to="/welcome">Home</Link>
          <Link className="textColor" to="/mybag">My Bag</Link>
          <Link className="textColor" to="/login">Login</Link>
          <Link className="textColor" to="/signup">Sign Up</Link>
        </div>
      )
      }
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userFirstName: state.user.firstName
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
