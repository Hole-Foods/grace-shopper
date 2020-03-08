import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleDonut } from '../store/donut';
import ReviewList from './ReviewList';
import { addItemToCart } from '../store/cart';
import FadeIn from 'react-fade-in';

const SingleDonut = props => {
  // declare dispatch function - always when you need dispatch
  const dispatch = useDispatch();

  // just like map state to props but assigning to a const variable
  const donut = useSelector(state => state.singleDonut);

  // just like component did mount
  useEffect(() => {
    dispatch(fetchSingleDonut(props.match.params.donutId));
  }, []);

  const addToCart = evt => {
    evt.preventDefault();
    const qty = parseInt(evt.target.qty.value);
    if (qty > 0 && qty <= donut.qty) {
      dispatch(addItemToCart({ donutId: donut.id, qty }));
    }
  };

  if (!donut) {
    return <div>4🍩4 no donut found</div>;
  }
  // console.log('SINGLEDONUT DONUTREVIEWS', donut.reviews);

  // if (donut.reviews) {
  //   console.log('donut.reviews1', donut.reviews.length);
  // }

  return (
    <>
      {/* <FadeIn transitionDuration="1000"> */}
      <div>
        <div className="singleDonut">
          <h1>{donut.name}</h1>
          <p>
            Average Rating:&nbsp;
            {donut.reviews
              ? donut.reviews
                  .reduce((acc, item) => {
                    return acc + item.rating / donut.reviews.length;
                  }, 0)
                  .toFixed(2)
              : null}
          </p>
          <FadeIn transitionDuration="1000">
            <img src={donut.imageUrl} />
          </FadeIn>
          <p>{donut.description}</p>
          <form id="add-to-cart" onSubmit={addToCart}>
            <input name="qty" type="number" min="1" max={donut.qty} />
            <button type="submit" className="btn btn-primary">
              Add to cart
            </button>
          </form>
          <br />
          <h2>Reviews</h2>
          <ReviewList reviews={donut.reviews} />
        </div>
      </div>
      {/* </FadeIn> */}
    </>
  );
};

export default SingleDonut;

// {
//   donut.reviews.reduce((acc, item) => {
//     return acc + item.rating / donut.reviews.length;
//   }, 0);
// }
