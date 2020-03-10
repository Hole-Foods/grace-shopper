import React, { useEffect } from 'react';
import ListedUser from './ListedUser';
import { fetchUsers } from '../store/users';
import { useDispatch, useSelector } from 'react-redux';

const AllUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const { users, admin } = useSelector(state => {
    return { users: state.users, admin: state.user };
  });

  if (!admin.isAdmin) {
    return <h1>4🍩4 Page Not Found</h1>;
  }

  return (
    <div>
      <h1>Admin Dash</h1>
      {users.length ? (
        users.map(user => <ListedUser key={user.id} user={user} />)
      ) : (
        <p>no users</p>
      )}
    </div>
  );
};

export default AllUsers;
