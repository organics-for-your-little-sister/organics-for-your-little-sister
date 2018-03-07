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
		const addressInfo = this.props.userInfo.addresses[0]
		const address = this.props.userInfo.addresses && `${addressInfo.mailingAddressStreet}, ${addressInfo.mailingAddressCity}, ${addressInfo.mailingAddressState} ${addressInfo.mailingAddressZipCode}`;

		return (
			<div>
				<div className="myBag textColor">
					<h3>Customer: {this.props.userInfo.firstName} {this.props.userInfo.lastName}</h3>
					<h5> Shipping Address:<br />
					{address}</h5>
					<p />
					<h5> Billing Address:<br />
					{address}</h5>

				</div>
			</div>
		)
	}


}

const mapStateToProps = (state) => {
	return {
		userInfo: state.user,
	}
}


export default connect(mapStateToProps)(Checkout);
