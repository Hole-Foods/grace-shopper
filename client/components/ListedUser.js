import React from 'react';
import { editUser, deleteUser } from '../store/users';
import { useDispatch } from 'react-redux';

const AllUsers = props => {
  const dispatch = useDispatch();

  if (!props.user) return <div>Loading...</div>;
  const { user } = props;

  const removeUser = () => {
    dispatch(deleteUser(user.id));
  };

  const promoteUser = () => {
    dispatch(editUser(user.id, { isAdmin: true }));
  };

  return (
    <div className="container">
      <h4>{user.email}</h4>
      {!user.isAdmin && (
        <button className="btn btn-warning" onClick={promoteUser}>
          Promote to Admin
        </button>
      )}
      {!user.isAdmin && (
        <button className="btn btn-danger" onClick={removeUser}>
          Delete User
        </button>
      )}
      {user.address ? (
        <div>
          <p>
            {user.address.firstName} {user.address.lastName}
          </p>
          <p>
            {user.address.address1}, {user.address.address2}
          </p>
          <p>
            {user.address.city}, {user.address.state} {user.address.zip}
          </p>
        </div>
      ) : (
        <p>no address data</p>
      )}
      {user.orders.length ? (
        <div>
          <h5>Past Orders</h5>
          {user.orders.map(order => (
            <div key={order.id}>
              <p>date: {order.createdAt}</p>
              <p>id: {order.id}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>no past orders</p>
      )}
    </div>
  );
};

export default AllUsers;
