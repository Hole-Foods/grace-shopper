import axios from 'axios';

const GET_USERS = 'GET_USERS';

const getUsers = users => ({
  type: GET_USERS,
  users,
});

export const fetchUsers = () => async dispatch => {
  try {
    const response = await axios.get(`/api/users/`);
    dispatch(getUsers(response.data));
  } catch (err) {
    console.log('fetchUsers thunk error: ', err);
  }
};

export const editUser = (userId, changes) => {
  return async dispatch => {
    try {
      await axios.put(`/api/users/${userId}`, changes);
      dispatch(fetchUsers());
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUser = userId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${userId}`);
      dispatch(fetchUsers());
    } catch (err) {
      console.log('deleteUser thunk error', err);
    }
  };
};

const init = [];

export default function(state = init, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
}
