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

const initUsers = [];

export default function(state = initUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
}
