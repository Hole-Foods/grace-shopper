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
export const fetchDonutReviews = donutId => {
  return async dispatch => {
    try {
      console.log('DONUT ID!!!!!!!', donutId);

      const { data } = await axios.get(`/api/reviews/donuts/${donutId}`);
      console.log('DATA!!!!!!!', data);
      dispatch(setReviews(data));
    } catch (err) {
      console.log('fetchReviews error', err);
    }
  };
};

export const addNewReview = review => async dispatch => {
  try {
    const { data } = await axios.post('/api/reviews', review);
    dispatch(addReview(data));
  } catch (err) {
    console.log('addNewReview err', err);
  }
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
