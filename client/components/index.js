/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar';
export { default as Footer } from './footer';
export { default as UserHome } from './user-home';
export { Login, Signup } from './auth-form';

export { default as Default } from './Default';
export { default as AllDonuts } from './AllDonuts';
export { default as Cart } from './Cart';
export { default as SingleDonut } from './SingleDonut';

export { default as OrderCheckout } from './OrderCheckout';
export { default as OrderConfirmation } from './OrderConfirmation';

//admin only pages
export { default as AddDonutForm } from './AddDonutForm';
export { default as AllUsers } from './AllUsers';
