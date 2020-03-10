import React, { useEffect } from 'react';
import SingleReview from './SingleReview';
import { fetchDonutReviews } from '../store/reviews';
import { useSelector, useDispatch } from 'react-redux';

const ReviewList = props => {
  const reviews = useSelector(state => state.reviews);
  const dispatch = useDispatch();

  // just like component did mount
  useEffect(() => {
    dispatch(fetchDonutReviews(props.donutId));
  }, []);

  if (!reviews || !reviews.length) {
    return <div className="mb-3">No reviews yet.</div>;
  }

  return (
    <div className="row my-3">
      {reviews.map(review => (
        <SingleReview key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
