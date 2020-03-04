import axios from 'axios';

const GET_CART = 'GET_CART';

const getCart = cart => ({
  type: GET_CART,
  cart,
});

export const fetchCart = userId => async dispatch => {
  try {
    const response = await axios.get(`/api/users/${userId}/cart`);
    dispatch(getCart(response.data));
  } catch (err) {
    console.log('fetchCart thunk error: ', err);
  }
};

const defaultCart = [];

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
