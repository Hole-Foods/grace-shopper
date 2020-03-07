import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleDonut } from '../store/donut';

import styled from 'styled-components';

const ReviewList = props => {
  console.log('REVIEW LIST PROPS', props);
  // const dispatch = useDispatch();
  const { reviews } = props;

  // // just like map state to props but assigning to a const variable
  // const reviews = useSelector(state => state.singleDonut.reviews);

  // // just like component did mount
  // useEffect(() => {
  //   dispatch(fetchSingleDonut(props.match.params.donutId));
  // }, []);

  // console.log('REVIEWLIST REVIEWS', reviews);

  if (!props.reviews) return <div>404</div>;

  const review = props.reviews[0];
  return (
    <>
      <DefaultDiv>
        <h2>Reviews</h2>
        <div key={review.id}>
          <h3>Review</h3>
          <h4>Stars: {review.rating}</h4>
          <p>{review.content}</p>
        </div>
      </DefaultDiv>
    </>
    // <div>
    //   <div>mmmm donuts</div>
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
