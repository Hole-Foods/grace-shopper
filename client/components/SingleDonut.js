import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleDonut } from '../store/donut';
import { addItemToCart } from '../store/cart';
import ReviewList from './ReviewList';
import AddReviewForm from './AddReviewForm';
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

  // NULL REF ERROR
  // console.log('donut reviews: ', donut.reviews && donut.reviews.length);

  return (
    <>
      <div className="container">
        <div className="card mb-3 my-3">
          <div className="row no-gutters">
            <div className="col-md-3">
              <FadeIn transitionDuration="1000">
                <img src={donut.imageUrl} className="card-img px-3 py-5" />
              </FadeIn>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{donut.name}</h5>
                <p className="card-text">
                  <small className="text-muted">${donut.price}</small>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Average Rating:&nbsp;
                    {donut.reviews
                      ? donut.reviews
                          .reduce((acc, item) => {
                            return acc + item.rating / donut.reviews.length;
                          }, 0)
                          .toFixed(1)
                      : null}
                  </small>
                </p>
                <p className="card-text">{donut.description}</p>
                <form id="add-to-cart" value="1" onSubmit={addToCart}>
                  <input name="qty" type="number" min="1" max={donut.qty} />
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Add to cart
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-primary">
          Reviews &nbsp;
          <span className="badge badge-light">
            {donut.reviews && donut.reviews.length ? donut.reviews.length : '0'}{' '}
          </span>
        </h2>
        <ReviewList donutId={donut.id} />
      </div>
      <div className="container">
        <AddReviewForm />
      </div>
    </>
  );
};

export default SingleDonut;
