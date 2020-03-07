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

export const deleteItemFromCart = donutId => async dispatch => {
  try {
    await axios.delete(`/api/cart/`, donutId);
    dispatch(fetchCart());
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
      let cart = [...state];
      let inCart = false;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].donutId === action.cartItem.donutId) {
          inCart = true;
          cart[i] = action.cartItem;
        }
      }
      if (!inCart) {
        cart.push(action.cartItem);
      }
      return cart;
    default:
      return state;
  }
}
