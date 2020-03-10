import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // import redux hooks
import { fetchUserInfo } from '../store/userInfo';
import SingleReview from './SingleReview';
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

  console.log('USER', user, 'USER INFO', userInfo);

  useEffect(() => {
    dispatch(fetchUserInfo(user.id));
  }, []);

  return (
    <div>
      <h3>Welcome, {user.email}</h3>
      <h3>Reviews: </h3>
      {userInfo.reviews ? (
        <div>
          {userInfo.reviews.map(review => (
            <SingleReview key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p>No reviews yet.</p>
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
