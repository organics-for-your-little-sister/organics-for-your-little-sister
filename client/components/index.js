/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as SideBar} from './SideBar'

export {default as authform} from './auth-form'

export {default as UserHome} from './user-home'
export {default as AccountInfo} from './AccountInfo'
export {default as SingleProduct} from './SingleProduct'
export {default as NewLineItem} from './newLineItem'
export {default as AllProducts} from './AllProducts'
export {default as ProductsByCategory} from './ProductsByCategory'
export {default as UserAllOrders} from './UserAllOrders'
export {default as UserSingleOrder} from './UserSingleOrder'
export {default as MyBag} from './MyBag'
export {default as Checkout} from './Checkout'
export {Login, Signup} from './auth-form'
