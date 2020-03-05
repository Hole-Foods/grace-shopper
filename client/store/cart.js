import axios from 'axios';

const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';

const getCart = cart => ({
  type: GET_CART,
  cart,
});
const addToCart = cartItem => ({
  type: ADD_TO_CART,
  cartItem,
});

export const fetchCart = () => async dispatch => {
  try {
    const response = await axios.get(`/api/cart/`);
    dispatch(getCart(response.data));
  } catch (err) {
    console.log('fetchCart thunk error: ', err);
  }
};

export const addItemToCart = donut => async dispatch => {
  try {
    const response = await axios.put(`/api/cart/`, donut);
    dispatch(addToCart(response.data));
  } catch (err) {
    console.log('addItemToCart thunk error: ', err);
  }
};

const initCart = [];

export default function(state = initCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      if (state.includes(action.cartItem)) {
        const newState = state.map(cartItem => {
          if (cartItem === action.cartItem) {
            cartItem.qty = cartItem.qty + action.cartItem.qty;
          }
        });
        return newState;
      } else {
        return [...state, action.cartItem];
      }
    default:
      return state;
  }
}
