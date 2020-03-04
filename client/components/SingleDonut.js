import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleDonut } from '../store/donut';

const SingleDonut = props => {
  // declare dispatch function - always when you need dispatch
  const dispatch = useDispatch();

  // just like map state to props but assigning to a const variable
  const donut = useSelector(state => state.singleDonut);

  // just like component did mount
  useEffect(() => {
    dispatch(fetchSingleDonut(props.match.params.donutId));
  }, []);

  if (!donut) {
    return;
  }

  return (
    <>
      <div>
        <div className="singleDonut">
          <h1>{donut.name}</h1>
          <img src={donut.imageUrl} />
          <p>{donut.description}</p>
          <h2>Donut Reviews</h2>
          {donut.reviews
            ? donut.reviews.map(review => (
                <div key={review.id}>
                  <h3>Review</h3>
                  <h4>Stars: {review.rating}</h4>
                  <p>{review.content}</p>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default SingleDonut;
