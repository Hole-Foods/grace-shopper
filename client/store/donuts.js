import axios from 'axios';

// action-types
const SET_DONUTS = 'SET_DONUTS';

// action-creators
const setDonuts = donuts => {
  return {
    type: SET_DONUTS,
    donuts,
  };
};

// thunk-creators
export const fetchDonuts = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/donuts');
      console.log('DONUTS DATA', data);
      dispatch(setDonuts(data));
    } catch (err) {
      console.log('fetchDonuts error', err);
    }
  };
};

//reducers
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DONUTS:
      return action.donuts;
    default:
      return state;
  }
};
