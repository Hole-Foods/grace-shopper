import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import donuts from './donuts';
import cart from './cart';
import order from './order';
import singleDonut from './donut';
import userInfo from './userInfo';
import users from './users';
import reviews from './reviews';

const reducer = combineReducers({
  user,
  donuts,
  singleDonut,
  cart,
  order,
  userInfo,
  users,
  reviews,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
