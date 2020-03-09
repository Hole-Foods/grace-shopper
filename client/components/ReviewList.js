import React from 'react';
import SingleReview from './SingleReview';

const ReviewList = props => {
  const { reviews } = props;

  if (!props.reviews || !props.reviews.length) {
    return <div>No reviews for this donut yet. Write one!</div>;
  }
  // console.log('REVIEW LIST PROPS', props);

  return (
    <div>
      <SingleReview reviews={reviews} />;
    </div>
  );
};

export default ReviewList;
