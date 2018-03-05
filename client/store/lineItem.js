import axios from 'axios';

//action type:
const GET_LINEITEM = 'GET_LINEITEM';
const CREATE_LINEITEM = 'CREATE_LINEITEM';
const UPDATE_LINEITEM = 'UPDATE_LINEITEM';
const DELETE_LINEITEM = 'DELETE_LINEITEM';

//action creators:
const getLineItem = (lineItem) => ({type: GET_LINEITEM, lineItem});

const createLineItem = (lineItem) => ({type: CREATE_LINEITEM, lineItem});

const editLineItem = (lineItem) => ({type: UPDATE_LINEITEM, lineItem});

const deleteLineItem = (id) => ({type: DELETE_LINEITEM, id})


//thunk
export const fetchLineItem = (id) => dispatch => {
  axios.get(`/api/lineitems/${id}`)
    .then(res => dispatch(getLineItem(res.data)))
    .catch(err => console.error(`Fetching lineItem: ${id} unsuccessful`, err));
  }

export const addLineItem = lineItem => dispatch => {
  axios.post('/api/lineitems')
    .then(res => dispatch(createLineItem(res.data)))
    .catch(err => console.error(`Creating lineItem: `, err));
}

export const changeLineItem = (id, lineItem) => dispatch => {
  axios.put(`/api/lineitems/${id}`, lineItem)
    .then(res => dispatch(editLineItem(res.data)))
    .catch(err => console.error(`Updating lineItem: ${lineItem}`, err));
}

export const removeLineItem = id => dispatch => {
  axios.delete(`/api/lineitems/${id}`)
    .then(() => dispatch(deleteLineItem(id)))
    .catch(err => console.error(`Removing lineItem ${id} unsuccessful`, err));
}

//reducer
export default function reducer(lineItem = {}, action) {
  switch (action.type){

    case GET_LINEITEM:
      return action.lineItem;

    case CREATE_LINEITEM:
      return Object.assign({}, lineItem, action.lineItem);

    case UPDATE_LINEITEM:
      return Object.assign({}, lineItem, action.lineItem)

    case DELETE_LINEITEM:
      return lineItem

    default:
      return lineItem;
  }
}

