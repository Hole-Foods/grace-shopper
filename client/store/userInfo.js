import axios from 'axios';

const SET_USER_INFO = 'SET_USER_INFO';
const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

const setUserInfo = userInfo => ({
  type: SET_USER_INFO,
  userInfo,
});

const updateUserInfo = update => ({
  type: UPDATE_USER_INFO,
  update,
});

export const fetchUserInfo = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      const action = setUserInfo(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const submitUpdate = info => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/userInfo/`, info);
      const action = updateUserInfo(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return action.userInfo;
    case UPDATE_USER_INFO:
      return { ...state, ...action.info };
    default:
      return state;
  }
}
