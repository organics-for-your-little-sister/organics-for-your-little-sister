/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as SideBar} from './SideBar'

export {default as UserHome} from './user-home'
export {default as SingleProduct} from './SingleProduct'
export {default as NewLineItem} from './lineItems/newLineItem'
export {default as AllProducts} from './AllProducts'
export {default as ProductsByCategory} from './ProductsByCategory'
export {default as MyBag} from './MyBag.jsx'
export {Login, Signup} from './auth-form'
