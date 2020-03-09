import React from 'react';
import SingleReview from './SingleReview';

const ReviewList = props => {
  const { reviews } = props;

  if (!props.reviews || !props.reviews.length) {
    return <div className="mb-3">No reviews for this donut yet.</div>;
  }

  return (
    <div>
      <SingleReview reviews={reviews} />
    </div>
  );
};

export default ReviewList;
