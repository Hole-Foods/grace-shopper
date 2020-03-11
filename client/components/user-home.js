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

  useEffect(() => {
    dispatch(fetchUserInfo(user.id));
  }, []);

  return (
    <div>
      <h3>Welcome, {user.email}</h3>
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn"
                type="button"
                data-toggle="collapse show"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Reviews
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              {userInfo.reviews ? (
                <div>
                  {userInfo.reviews.map(review => (
                    <SingleReview key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <p>No reviews.</p>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <button
                className="btn"
                type="button"
                data-toggle="collapse show"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Order History
              </button>
            </h5>
          </div>

          <div
            id="collapseTwo"
            className="collapse show"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              {userInfo.orders ? (
                <OrderList orders={userInfo.orders} />
              ) : (
                <h4>No Orders</h4>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header" id="headingThree">
            <h5 className="mb-0">
              <button
                className="btn"
                type="button"
                data-toggle="collapse show"
                data-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Edit Shipping Information
              </button>
            </h5>
          </div>

          <div
            id="collapseThree"
            className="collapse show"
            aria-labelledby="headingThree"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              {userInfo.address ? (
                <UserUpdateForm address={userInfo.address} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default UserHome;
