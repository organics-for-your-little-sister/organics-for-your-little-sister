import axios from 'axios';

// ACTION TYPE
    // GET PRODUCTS
const ALL_PRODUCTS = 'ALL_PRODUCTS';
const SINGLE_PRODUCT = 'SINGLE_PRODUCT';
const CATEGORY_PRODUCTS = 'CATEGORY_PRODUCTS';

    // GET PRODUCT'S REVIEWS
// const PRODUCT_ALL_REVIEWS = 'PRODUCT_ALL_REVIEWS';
const PRODUCT_SINGLE_REVIEW = 'PRODUCT_SINGLE_REVIEW'
    // POST, PUT, DELETE PRODUCT
const NEW_PRODUCT = 'NEW_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

// ACTION CREATOR
    // GET PRODUCTS ACTION
const allProducts = (products) => ({type: ALL_PRODUCTS, products})
const singleProduct = (product) => ({type: SINGLE_PRODUCT, product})
const categoryProduct = (products) => ({type: CATEGORY_PRODUCTS, products})

    // GET PRODUCT'S REVIEWS
// const productAllReviews = (reviews) => ({type: PRODUCT_ALL_REVIEWS, reviews})
const productSingleReview = (review) => ({type: PRODUCT_SINGLE_REVIEW, review})
    // POST, PUT, DELETE PRODUCT
const newProduct = (product) => ({type: NEW_PRODUCT, product })
const editProduct = (product) => ({type: EDIT_PRODUCT, product })
const removeProduct = (id) => ({type: REMOVE_PRODUCT, id })

// THUNK
    // 3 thunks of GET
export const thunkAllProducts = () =>
  dispatch =>
    axios.get('/api/products') // please get help what path I should use
      .then( res => dispatch(allProducts(res.data)))
      .catch(err => console.error('error from thunkAllProducts', err))

export const thunkSingleProduct = (id) =>
  dispatch =>
    axios.get(`/api/products/${id}`)
      .then( res => dispatch(singleProduct(res.data)))
      .catch(err => console.error('error from thunkSingleProduct', err))

export const thunkProductsByCategory = (categoryName) =>
  dispatch =>
    axios.get(`/api/products/category/${categoryName}`)
      .then( res => dispatch(categoryProduct(res.data)))
      .catch(err => console.error('error from thunkProductsByCategory', err))


     // thunk for GET SINGLE REVIEW
export const thunkProductSingleReview = (productId, reviewId) =>
  dispatch =>
    axios.get(`/api/products/${productId}/reviews/${reviewId}`)
      .then( res => dispatch(productSingleReview(res.data)))
      .catch( err => console.error('error from thunkProductSingleReview', err))

    // 3 thunks of POST, EDIT, DELETE
export const thunkNewProduct = (product) =>
  dispatch =>
    axios.post('/api/products', product)
      .then( newProduct => dispatch(categoryProduct(newProduct)) )
      .catch(err => console.error('error from thunkNewProduct', err))

export const thunkEditProduct = (id, product) =>
  dispatch =>
    axios.put(`/api/products/${id}`, product)
      .then( res => dispatch(editProduct(res.data)))
      .catch( err => console.error('error from thunkEditProduct', err))

export const thunkRemoveProduct = (id) =>
  dispatch =>
    axios.delete(`/api/products/${id}`)
      .then(() => dispatch(removeProduct(id)))
      .catch(err => console.error('error from thunkRemoveProduct', err))

// REDUCER

export default function reducer(products = [], action){
  switch (action.type) {
    case ALL_PRODUCTS:
      return action.products

    case SINGLE_PRODUCT:
      return action.product

    case CATEGORY_PRODUCTS:
      return action.products

    case PRODUCT_SINGLE_REVIEW:
      return action.review

    case NEW_PRODUCT:
      return [...products, action.product]

    case EDIT_PRODUCT:
      return products.map( product => action.product.id === product.id ? action.product : product ) // returning a new array with action.product.

    case REMOVE_PRODUCT:
      return products.filter( product => product.id !== action.id ) // returning a new array that excluded a product of the action.id

    default:
      return products;
  }
}
