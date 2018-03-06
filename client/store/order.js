import axios from 'axios';

// ACTION TYPES
const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER';
const CREATE_ORDER = 'CREATE_ORDER';
const EDIT_ORDER = 'EDIT_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';
const CREATE_LINEITEM = 'CREATE_LINEITEM';
const UPDATE_LINEITEM = 'UPDATE_LINEITEM';
const DELETE_LINEITEM = 'DELETE_LINEITEM';

// ACTION CREATORS
const allOrders = (orders) => ({type: GET_ALL_ORDERS, orders});
const singleOrder = (order) => ({type: GET_SINGLE_ORDER, order});
const createOrder = (order) => ({type: CREATE_ORDER, order});
const editOrder = (order) => ({type: EDIT_ORDER, order});
const deleteOrder = (id) => ({type: DELETE_ORDER, id});
const createLineItem = (lineItem) => ({type: CREATE_LINEITEM, lineItem});
const editLineItem = (lineItem) => ({type: UPDATE_LINEITEM, lineItem});
const deleteLineItem = (id) => ({type: DELETE_LINEITEM, id})



// THUNK CREATORS
export const fetchAllOrders = () => {
	return dispatch => {
		return axios.get('/api/orders')
			.then(res => res.data)
			.then(orders => {
				const action = allOrders(orders);
				console.log(action);
				dispatch(action);
				})
			.catch(err => console.error('Oops! Guess what is wrong in fetchAllOrders thunk!', err))
	}
}

export const fetchSingleOrder = (orderId) => {
	return dispatch => {
		return axios.get(`/api/orders/${orderId}`)
			.then(res => res.data)
			.then(order => dispatch(singleOrder(order)))
			.catch(err => console.error('Oops! Can you find out what is wrong in fetchSingleOrder thunk?', err))
	}
}

export const fetchAllOrdersByUserX = (userId) => {
	console.log("Inside fetchAllOrdersByUserX");
	console.log("3. fetchAllOrdersByUserX");
	return dispatch => {
		return axios.get(`/api/users/${userId}/orders`)
			.then(res => res.data)
			.then(orders => dispatch(allOrders(orders)))
			.catch(err => console.error('Oops! What did you just do in fetchAllOrdersByUserX thunk?', err))
	}
}


export const fetchSingleOrderByUserX = (userId, orderId) => {
	return dispatch => {
		return axios.get(`/api/users/${userId}/orders/${orderId}`)
			.then(res => res.data)
			.then(order => dispatch(singleOrder(order)))
			.catch(err => console.error('Oops! We are kind of stuck here in fetchSingleOrderByUserX thunk...', err))
	}
}

export const postOrder = (order) => {
	return dispatch => {
		 return axios.post(`/api/orders`, order)
			.then(res => res.data)
			.then(res => dispatch(createOrder(res)))
			.catch(err => console.error('Oops! Did it just happen in postOrder thunk!?', err))
	}
}

export const putOrder = (orderId, order) => {
	return dispatch => {
		return axios.put(`/api/orders/${orderId}`, order)
			.then(res => res.data)
			.then(order => dispatch(editOrder(order)))
			.catch(err => console.error('Oops! Looks like something is wrong in putOrder thunk.', err))
	}
}

export const removeOrder = (id) => {
	return dispatch => {
		return axios.delete(`/api/orders/${id}`, 'UserController@destroy')
			.then(() => dispatch(deleteOrder(id)))
			.catch(err => console.error('Oops! Time to find the error in removeOrder thunk, eh?', err))
	}
}
export const addLineItem = (orderId, lineItem ) => {
	return dispatch => {
  	return axios.post(`/api/lineitems/${orderId}`, lineItem)
		.then(res => res.data)
    .then(LineItem => {
    	console.log('inside LI thunk', LineItem)
    	dispatch(createLineItem(LineItem))})
    .catch(err => console.error('error from addLineItem thunk', err));
  }
}


export const changeLineItem = (id, lineItem) => dispatch => {
  return axios.put(`/api/lineitems/${id}`, lineItem)
    .then(res => dispatch(editLineItem(res.data)))
    .catch(err => console.error(`Updating lineItem: ${lineItem}`, err));
}

export const removeLineItem = id => dispatch => {
  return axios.delete(`/api/lineitems/${id}`)
    .then(() => dispatch(deleteLineItem(id)))
    .catch(err => console.error(`Removing lineItem ${id} unsuccessful`, err));
}

const order = {lineItems: []}

// REDUCER
export default function reducer(state = order, action) {

	switch (action.type) {

		case GET_ALL_ORDERS:
			return action.orders;

		case GET_SINGLE_ORDER:
			return action.order;

		case CREATE_ORDER:
			return Object.assign({}, state, action.order)

		case CREATE_LINEITEM:
			return Object.assign({}, state.lineItems, {lineItems: [action.lineItem]})

		case DELETE_ORDER:
			return state;

		case UPDATE_LINEITEM:
			return Object.assign({}, state.lineItems, {lineItems: [...state.lineItems, action.lineitem]})

		case DELETE_LINEITEM:
			return state.order.lineItems.filter(lineItem => state.id !== lineItem.id)

	    default:
			return state;
	}
}
