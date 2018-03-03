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
        {
          this.props
        }
      </div>
    )
  }
}

const mapStateToProps = null

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: () => dispatch(thunkSingleProduct())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleProduct);
