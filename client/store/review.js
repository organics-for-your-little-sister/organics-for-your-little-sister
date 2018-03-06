import axios from 'axios'

//ACTION TYPES
const INITILIZE_REVIEWS = 'INITILIZE_REVIEWS'; // ?
const INITILIZE_REVIEW = 'INITILIZE_REVIEW'; // ? by category or by product
const CREATE_REVIEW = 'CREATE_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';


//ACTION CREATORS
const initilizeReviews = reviews => ({type: INITILIZE_REVIEWS, reviews})
const initilizeReview = review => ({type: INITILIZE_REVIEW, review})
const createReview = review => ({type: CREATE_REVIEW, review})
const updateReview = review => ({type: UPDATE_REVIEW, review})
const deleteReview = id => ({type: DELETE_REVIEW, id})

//THUNKS

export const fetchReviews = () => dispatch => {
  axios.get('/api/reviews')
    .then(res => dispatch(initilizeReviews(res.data)))
    .catch(err => console.error('Fetching reviews unsuccessful', err));
}

export const fetchSingleReview = id => dispatch => {
  axios.get(`/api/reviews/${id}`)
    .then(res => dispatch(initilizeReview(res.data)))
    .catch(err => console.error(`Fetching single review: ${id} unsuccessful`, err));
}

export const removeReview = id => dispatch => {
  axios.delete(`/api/reviews/${id}`)
    .then(() => dispatch(deleteReview(id)))
    .catch(err => console.error(`Removing review ${id} unsuccessful`, err));
}

export const addReview = review => dispatch => {
  axios.post('/api/reviews', review)
    .then(res => dispatch(createReview(res.data)))
    .catch(err => console.error(`Creating review: ${review}`, err));
}

export const changeReview = (id, review) => dispatch => {
  axios.put(`/api/reviews/${id}`, review)
    .then(res => dispatch(updateReview(res.data)))
    .catch(err => console.error(`Updating review: ${review}`, err));
}

//reducer

export default function reducer(reviews = [], action) {
  switch (action.type) {

    case INITILIZE_REVIEWS:
      return action.reviews;

    case INITILIZE_REVIEW:
      return action.review;

    case CREATE_REVIEW:
      return [action.review, ...reviews];

    case UPDATE_REVIEW:
      return reviews.map(review => (
        action.review.id === review.id ? action.review : review
    ));

    case DELETE_REVIEW:
      return reviews.filter(review => review.id !== action.id);

    default:
      return reviews;
  }
}

