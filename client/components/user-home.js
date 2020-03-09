import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // import redux hooks
import { fetchUserInfo } from '../store/userInfo';
import ReviewList from './ReviewList';

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

  //Drop down menu with reviews, order history
  //edit shipping and credit card information

  console.log('USER INFO: ', userInfo);

  return (
    <div>
      <h3>Welcome, {user.email}</h3>
      <h3>View Reviews: </h3>
      {userInfo.reviews ? (
        <ReviewList reviews={userInfo.reviews} />
      ) : (
        <h4>No Reviews</h4>
      )}
    </div>
  );
};

export default UserHome;
