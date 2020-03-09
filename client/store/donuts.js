import axios from 'axios';

// action-types
const SET_DONUTS = 'SET_DONUTS';
const ADD_DONUT = 'ADD_DONUT';

// action-creators
const setDonuts = donuts => {
  return {
    type: SET_DONUTS,
    donuts,
  };
};
const addDonut = donut => {
  return {
    type: ADD_DONUT,
    donut,
  };
};

// thunk-creators
export const fetchDonuts = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/donuts');
      dispatch(setDonuts(data));
    } catch (err) {
      console.log('fetchDonuts error', err);
    }
  };
};

export const createDonut = donut => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/donuts', donut);
      dispatch(addDonut(response.data));
    } catch (err) {
      console.log('createDonut thunk error', err);
    }
  };
};

//reducers
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DONUTS:
      return action.donuts;
    case ADD_DONUT:
      return [...state, action.donut];
    default:
      return state;
  }
};
