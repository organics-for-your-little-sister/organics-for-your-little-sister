/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchAllOrders} from './order'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {order: {}}

//fake axios & fake store being created
  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchAllOrders thunk', () => {
    it('eventually dispatches the GET_ALL_ORDERS action', () => {
      const fakeOrder = {orderStatus: 'cart', totalOrderPrice: 7500, totalOrderQuantity: 30}
      mockAxios.onGet('api/orders').replyOnce(200, fakeOrder)
      return store.dispatch(fetchAllOrders())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_ALL_ORDERS')
          expect(actions[0].orders).to.be.deep.equal(fakeOrder)
        })
    })
  })


})
