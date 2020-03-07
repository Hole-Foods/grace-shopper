import React, { useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
//import { fetchSingleDonut } from '../store/donut';

import styled from 'styled-components';

const ReviewList = props => {
  console.log('REVIEW LIST PROPS', props);
  // const dispatch = useDispatch();
  if (!props.reviews || !props.reviews.length)
    return <div>No reviews for this donut</div>;
  //const { reviews } = props;

  // // just like map state to props but assigning to a const variable
  // const reviews = useSelector(state => state.singleDonut.reviews);

  // // just like component did mount
  // useEffect(() => {
  //   dispatch(fetchSingleDonut(props.match.params.donutId));
  // }, []);

  // console.log('REVIEWLIST REVIEWS', reviews);

  const review = props.reviews[0];
  return (
    <>
      <DefaultDiv>
        <h2>Reviews</h2>
        <div key={review.id}>
          <h4>Stars: {review.rating}</h4>
          <p>{review.content}</p>
        </div>
      </DefaultDiv>
    </>

    //   <div className="container">
    //   <div className="row">
    //     {reviews.map(review => (
    //       <DefaultDiv key={review.id}>
    //         <div className="col-md">
    //           <div className="card">
    //             <div className="card-body">
    //               <h3 className="card-title">Stars: {review.rating}</h3>
    //               <p className="card-text">{review.content}</p>
    //             </div>
    //           </div>
    //         </div>
    //       </DefaultDiv>
    //     ))}
    //   </div>
    // </div>
  );
};

export default ReviewList;

const DefaultDiv = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  padding: 4px;
`;
