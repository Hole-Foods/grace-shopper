import React, { useEffect, useState } from 'react';
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

  const [qty, setQty] = useState(1);

  const addToCart = evt => {
    setQty(evt.target.qty.value);
    console.log(qty);
    if (qty > 0 && qty <= donut.qty) {
      dispatch(addItemToCart({ donutId: donut.id, qty }));
    }
  };

  if (!donut) {
    return <div>4🍩4 no donut found</div>;
  }

  return (
    <>
      <div>
        <div className="singleDonut">
          <h1>{donut.name}</h1>
          <img src={donut.imageUrl} />
          <p>{donut.description}</p>
          <form>
            <input name="qty" type="number" min="1" max={donut.qty} />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={addToCart}
            >
              Add to cart
            </button>
          </form>
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
