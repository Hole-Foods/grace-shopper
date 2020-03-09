import axios from 'axios';

const SET_USER_INFO = 'SET_USER_INFO';

const setUserInfo = userInfo => ({
  type: SET_USER_INFO,
  userInfo,
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

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return action.userInfo;
    default:
      return state;
  }
}
