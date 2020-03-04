import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_DONUT = 'GET_DONUT';

/**
 * INITIAL STATE
 */
const singleDonut = {};

/**
 * ACTION CREATORS
 */
const getDonut = donut => ({ type: GET_DONUT, donut });

/**
 * THUNK CREATORS
 */

export const fetchSingleDonut = donutId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/donuts/${donutId}`);
      const action = getDonut(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * REDUCER
 */
export default function(state = singleDonut, action) {
  switch (action.type) {
    case GET_DONUT:
      return action.donut;
    default:
      return state;
  }
}
