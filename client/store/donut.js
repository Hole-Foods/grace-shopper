import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_DONUT = 'SET_DONUT';

/**
 * INITIAL STATE
 */
const singleDonut = {};

/**
 * ACTION CREATORS
 */
const setDonut = donut => ({ type: SET_DONUT, donut });

/**
 * THUNK CREATORS
 */

export const fetchSingleDonut = donutId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/donuts/${donutId}`);
      const action = setDonut(data);
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
    case SET_DONUT:
      return action.donut;
    default:
      return state;
  }
}
