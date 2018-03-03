import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkSingleProduct } from '../store/product'

class singleProduct extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchProduct();
  }

  render() {
    console.log('props?', this.props)
    return (
      <div>
      Is this rendering?
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.location.pathname.substring(ownProps.location.pathname.length - 1)
  return {
    product: state.product
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.location.pathname.substring(ownProps.location.pathname.length - 1)
  return {
    fetchProduct: () => dispatch(thunkSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleProduct);
