import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // import redux hooks
import { fetchUserInfo } from '../store/userInfo';
import SingleReview from './SingleReview';
import OrderList from './OrderList';
import UserUpdateForm from './UserUpdateForm';
import { Accordion, Card, Button } from 'react-bootstrap';

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
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              See Your Reviews
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {userInfo.reviews ? (
                <div>
                  {userInfo.reviews.map(review => (
                    <SingleReview key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <p>No reviews.</p>
              )}
            </Card.Body>
          </Accordion.Collapse>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              See Your Orders
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {userInfo.orders ? (
                <OrderList orders={userInfo.orders} />
              ) : (
                <h4>No Orders</h4>
              )}
            </Card.Body>
          </Accordion.Collapse>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Edit Shipping Information
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              {userInfo.address ? (
                <UserUpdateForm address={userInfo.address} />
              ) : null}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default UserHome;

//WITHOUT REACT-BOOTSTRAP-- NON-FUNCTIONAL
// return (
//   <div>
//     <h3>Welcome, {user.email}</h3>
//     <div className="accordion" id="accordionExample">
//       <div className="card">
//         <div className="card-header" id="headingOne">
//           <h5 className="mb-0">
//             <button
//               className="btn btn-primary"
//               type="button"
//               data-toggle="collapse"
//               data-target="#collapseOne"
//               aria-expanded="true"
//               aria-controls="collapseOne"
//             >
//               See Your Reviews
//             </button>
//           </h5>
//         </div>

//         <div
//           id="collapseOne"
//           className="collapse"
//           aria-labelledby="headingOne"
//           data-parent="#accordionExample"
//         >
//           <div className="card-body">
//             {userInfo.reviews ? (
//               <div>
//                 {userInfo.reviews.map(review => (
//                   <SingleReview key={review.id} review={review} />
//                 ))}
//               </div>
//             ) : (
//               <p>No reviews.</p>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="card">
//         <div className="card-header" id="headingTwo">
//           <h5 className="mb-0">
//             <button
//               className="btn btn-primary"
//               type="button"
//               data-toggle="collapse"
//               data-target="#collapseTwo"
//               aria-expanded="false"
//               aria-controls="collapseTwo"
//             >
//               See Your Order History
//             </button>
//           </h5>
//         </div>

//         <div
//           id="collapseTwo"
//           className="collapse"
//           aria-labelledby="headingTwo"
//           data-parent="#accordionExample"
//         >
//           <div className="card-body">
//             {userInfo.orders ? (
//               <OrderList orders={userInfo.orders} />
//             ) : (
//               <h4>No Orders</h4>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="card">
//         <div className="card-header" id="headingThree">
//           <h5 className="mb-0">
//             <button
//               className="btn btn-primary"
//               type="button"
//               data-toggle="collapse"
//               data-target="#collapseThree"
//               aria-expanded="false"
//               aria-controls="collapseThree"
//             >
//               Edit Shipping Information
//             </button>
//           </h5>
//         </div>

//         <div
//           id="collapseThree"
//           className="collapse"
//           aria-labelledby="headingThree"
//           data-parent="#accordionExample"
//         >
//           <div className="card-body">
//             {userInfo.address ? (
//               <UserUpdateForm address={userInfo.address} />
//             ) : null}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
