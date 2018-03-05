import axios from 'axios';

// ACTION TYPES
const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER';
const CREATE_ORDER = 'CREATE_ORDER';
const EDIT_ORDER = 'EDIT_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';

// ACTION CREATORS
const allOrders = (orders) => ({type: GET_ALL_ORDERS, orders});
const singleOrder = (order) => ({type: GET_SINGLE_ORDER, order});
const createOrder = (order) => ({type: CREATE_ORDER, order});
const editOrder = (order) => ({type: EDIT_ORDER, order});
const deleteOrder = (id) => ({type: DELETE_ORDER, id});
// const editOrder = (order) => ({type: EDIT_ORDER, order});
// const deleteOrder = (id) => ({type: DELETE_ORDER, id});

// THUNK CREATOR

// THUNK CREATORS
export const fetchAllOrders = () => {
	return dispatch => {
		axios.get('/api/orders')
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
		axios.get(`/api/orders/${orderId}`)
			.then(res => res.data)
			.then(order => dispatch(singleOrder(order)))
			.catch(err => console.error('Oops! Can you find out what is wrong in fetchSingleOrder thunk?', err))
	}
}


export const fetchAllOrdersByUserX = (userId) => {
	console.log("Inside fetchAllOrdersByUserX");
	console.log("3. fetchAllOrdersByUserX");
	return dispatch => {
		axios.get(`/api/users/${userId}/orders`)
			.then(res => res.data)
			.then(orders => dispatch(allOrders(orders)))
			.catch(err => console.error('Oops! What did you just do in fetchAllOrdersByUserX thunk?', err))
	}
}


export const fetchSingleOrderByUserX = (userId,orderId) => {
	return dispatch => {
		axios.get(`/api/users/${userId}/orders/${orderId}`)
			.then(res => res.data)
			.then(order => dispatch(singleOrder(order)))
			.catch(err => console.error('Oops! We are kind of stuck here in fetchSingleOrderByUserX thunk...', err))
	}
}

export const postOrder = () => {
	return dispatch => {
		axios.post(`/api/users/${userId}/orders`, order)
			.then(res => res.data)
			.then(order => dispatch(createOrder(order)))
			.catch(err => console.error('Oops! Did it just happen in postOrder thunk!?', err))
	}
}

export const putOrder = (id, order) => {
	return dispatch => {
		axios.put(`/api/orders/${id}`, order)
			.then(res => res.data)
			.then(order => dispatch(editOrder(order)))
			.catch(err => console.error('Oops! Looks like something is wrong in putOrder thunk.', err))
	}
}

export const removeOrder = (id) => {
	return dispatch => {
		axios.delete(`/api/orders/${id}`, 'UserController@destroy')
			.then(() => dispatch(deleteOrder(id)))
			.catch(err => console.error('Oops! Time to find the error in removeOrder thunk, eh?', err))
	}
}


// REDUCER
export default function reducer(orders = [], action) {
	console.log("REDUCER!!!!!");
	console.log(action);
	switch(action.type) {
		case GET_ALL_ORDERS:
		console.log("4. GET_ALL_ORDERS");
			return action.orders;
		case GET_SINGLE_ORDER:
			return action.order;
		case CREATE_ORDER:
			return [action.order, ...orders];
    case EDIT_ORDER:
      return orders.map( order => action.order.id === order.id ? action.order : order ) // returning a new array with action.order.
    case DELETE_ORDER:
      return orders.filter( order => order.id !== action.id ) // returning a new array that excluded a order of the action.id
		default:
			return orders;
	}
}
