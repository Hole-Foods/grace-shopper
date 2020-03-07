import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */

/**
 * ACTION CREATORS
 */

/**
 * THUNK CREATORS
 */
export const submitOrder = formData => async dispatch => {
  try {
    const { data } = await axios.put(`/api/orders/`, formData);
    // FINISH
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
export default (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};
