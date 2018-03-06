import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { fetchUser } from '../store/user'
import store from '../store/user'


class Checkout extends Component {
	componentDidMount() {
		// this.props.fetchUserAddresses();
	}


	// render the user info:
	// user first and last names
	// many addresses to select from

	// checkout with Stripe
 
	render () {
		const address = this.props.userInfo.addresses && this.props.userInfo.addresses[0].mailingAddressStreet;

		return (
		
			<div>
				<div>
					<h3>{this.props.userInfo.firstName} {this.props.userInfo.lastName}</h3>
					<h5>{address}</h5>

				</div>
			</div>
		)
	}


}

const mapStateToProps = (state, ownProps) => {
	console.log('STATE!!!!!!')
	console.log(state.user)
	return {
		userInfo: state.user,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {

	}
}



export default connect(mapStateToProps, mapDispatchToProps)(Checkout);