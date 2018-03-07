import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../store/user'


class Checkout extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }


    // pull user info from the database by userId



    // render the user info:
    // user first and last names
    // many addresses to select from

    // checkout with Stripe

    render () {
        return (
            <div>
                <div>
                    <h3>SHOWWWWWWW</h3>
                </div>
            </div>
        )
    }


}


const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUser: () => dispatch(fetchUser(+ownProps.match.params.userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);