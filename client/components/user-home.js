import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // import redux hooks
import { fetchUserInfo } from '../store/userInfo';
import ReviewList from './ReviewList';
import OrderList from './OrderList';
import UserUpdateForm from './UserUpdateForm';

/**
 * COMPONENT
 */
const UserHome = () => {
  const dispatch = useDispatch();

  const { user, userInfo } = useSelector(state => {
    return {
      user: state.user,
      userInfo: state.userInfo,
    };
  });

  useEffect(() => {
    dispatch(fetchUserInfo(user.id));
  }, []);

  return (
    <div>
      <h3>Welcome, {user.email}</h3>
      <h3>Reviews: </h3>
      {userInfo.reviews ? (
        <ReviewList reviews={userInfo.reviews} />
      ) : (
        <h4>No Reviews</h4>
      )}
      <h3>Order History: </h3>
      {userInfo.orders ? (
        <OrderList orders={userInfo.orders} />
      ) : (
        <h4>No Orders</h4>
      )}
      {userInfo.address ? <UserUpdateForm address={userInfo.address} /> : null}
    </div>
  );
};

export default UserHome;
