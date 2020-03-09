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

  console.log('USER: ', user);
  console.log('USER INFO: ', userInfo);

  useEffect(() => {
    dispatch(fetchUserInfo(user.id));
  }, []);

  return (
    <div>
      <h3>Welcome, {user.email}</h3>
      <h3>Your Reviews: </h3>
      {userInfo.reviews ? (
        <ReviewList reviews={userInfo.reviews} />
      ) : (
        <h4>No Reviews</h4>
      )}
    </div>
  );
};

export default UserHome;

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     email: state.user.email
//   }
// }

// export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
