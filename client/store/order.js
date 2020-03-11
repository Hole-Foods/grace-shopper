import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */

const ORDER_CONFIRMED = 'ORDER_CONFIRMED';

/**
 * ACTION CREATORS
 */

const orderConfirmed = order => ({
  type: ORDER_CONFIRMED,
  order,
});

/**
 * THUNK CREATORS
 */

export const submitOrder = formData => async dispatch => {
  try {
    const { data } = await axios.put(`/api/orders/`, formData);
    dispatch(orderConfirmed(data));
    history.push({ pathname: '/confirmation' });
  } catch (err) {
    console.error(err);
  }
};

/**
 * INITIAL STATE
 */

/**
 * REDUCERS
 */

export default (state = {}, action) => {
  switch (action.type) {
    case ORDER_CONFIRMED:
      return {
        ...state,
        order: {
          ...action.order.address,
          id: action.order.order.id,
          receiptUrl: action.order.order.receiptUrl,
          chargeId: action.order.order.chargeId,
          items: action.order.items,
        },
      };
    default:
      return state;
  }
};
