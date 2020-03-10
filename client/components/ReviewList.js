import React, { useEffect } from 'react';
import SingleReview from './SingleReview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonutReviews } from '../store/reviews';

const ReviewList = props => {
  const dispatch = useDispatch();

  const reviews = useSelector(state => state.reviews);

  const { donutId } = props;

  useEffect(() => {
    dispatch(fetchDonutReviews(donutId));
  }, []);

  if (!reviews || !reviews.length) {
    return <div className="mb-3">No reviews for this donut yet.</div>;
  }

  if (!donutId) return <div>loading...</div>;

  return (
    <div className="row my-3">
      {reviews.map(review => (
        <SingleReview key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
