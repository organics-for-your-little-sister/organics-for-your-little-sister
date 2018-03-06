import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
// const GET_USER_ADDRESSES = 'GET_USER_ADDRESSES'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const CREATE_USER = 'CREATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
// const getUserAddresses = userAddresses => ({type: GET_USER_ADDRESSES, userAddresses})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = user => ({type: UPDATE_USER, user})
const createUser = user => ({type: CREATE_USER, user})


/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

// get userX's information, should be in a separate reducer
// export const fetchUser = (userId) =>
//   dispatch => {
//     axios.get(`/api/users/${userId}`)
//       .then(res => {
//         dispatch(getUser(res.data))
//       })
//       .catch(err => console.log('fetchUser thunk creator red light flickering!!!!', err))
//   }

// get userX's addresses
// export const fetchUserAddresses = (userId) =>
//   dispatch => {
//     axios.get(`api/users/userId/addresses`)
//       .then(res => {
//         dispatch(getUserAddresses(res.data))
//       })
//       .catch(err => console.log('fetchUserAddresses thunk creator ERROR!!!!!!!!!!', err))
//   }

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    // case GET_USER_ADDRESSES:
    //   return action.userAddresses
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return Object.assign({},state,{user: action.user})
    case CREATE_USER:
      return Object.assign({},state,{user: action.user})
    default:
      return state
  }
}
