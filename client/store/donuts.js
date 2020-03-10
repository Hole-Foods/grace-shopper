import axios from 'axios';
import history from '../history';

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
      history.push({ pathname: '/donuts' });
    } catch (err) {
      console.log('createDonut thunk error', err);
    }
  };
};

export const deleteDonut = donutId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/donuts/${donutId}`);
      dispatch(fetchDonuts());
    } catch (err) {
      console.log('deleteDonut thunk error', err);
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
