import axios from 'axios';

// action-types
const SET_REVIEWS = 'SET_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';

// action-creators
const setReviews = reviews => {
  return {
    type: SET_REVIEWS,
    reviews,
  };
};

const addReview = review => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

// thunk-creators
export const fetchReviews = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/reviews');
      dispatch(setReviews(data));
    } catch (err) {
      console.log('fetchReviews error', err);
    }
  };
};

export const addNewReview = review => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/reviews');
      dispatch(addReview(data));
    } catch (err) {
      console.log('addNewReview err', err);
    }
  };
};

//reducers
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return action.reviews;
    case ADD_REVIEW:
      return [...state, action.review];
    default:
      return state;
  }
};
