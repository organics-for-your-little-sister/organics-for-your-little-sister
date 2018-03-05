import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { withRouter, NavLink } from 'react-router-dom';


export const AccountInfo = (props) => {
  const userId=1;
  const accountdetails=(
    <div>
    "Welcome to Account Information"
    <div className="row">
      <div className="col-sm-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title"><Link to={`/account/orders/${userId}`}>Your Orders</Link></h5>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Login Information</h5>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Addresses</h5>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Reviews</h5>
          </div>
        </div>
      </div>
    </div>
  </div>

  )

  return (
    <div>
    {accountdetails} 
    </div>
  )
}

/*const mapStateToProps = (state, ownProps) => { 
 return {
  order: state.order
  }
}*/


//export default withRouter(connect(mapStateToProps)(AccountInfo));
