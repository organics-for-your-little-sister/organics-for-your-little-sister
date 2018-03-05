import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import order from './order'
import product from './product'
import order from './order'
import lineItem from './lineItem'

const reducer = combineReducers({user,order})
const reducer = combineReducers({user, product, lineItem, order})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './order'
export * from './product'
export * from './lineItem'
