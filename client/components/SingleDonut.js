import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleDonut } from '../store/donut';
import ReviewList from './ReviewList';

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
  console.log('SINGLEDONUT DONUTREVIEWS', donut.reviews);
  return (
    <>
      <div>
        <div className="singleDonut">
          <h1>{donut.name}</h1>
          <img src={donut.imageUrl} />
          <p>{donut.description}</p>
          <ReviewList reviews={donut.reviews} />
        </div>
      </div>
    </>
  );
};

export default SingleDonut;
