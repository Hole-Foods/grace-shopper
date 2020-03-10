import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//STRIPE
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderCheckoutForm from './OrderCheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_DzVlyfjoZiS6pdStgCpDJIc200YU6L9vVh');

// REMOVE BELOW
import { fetchCart } from '../store/cart';

const OrderCheckout = () => {
  const dispatch = useDispatch();

  const { cart, user } = useSelector(state => {
    return {
      cart: state.cart,
      user: state.user,
    };
  });

  useEffect(() => {
    dispatch(fetchCart(user.id));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          Shipping Info
          <br />
          <br />
          <Elements stripe={stripePromise}>
            <OrderCheckoutForm />
          </Elements>
        </div>
        <div className="col-md-6">
          Cart Summary
          <br />
          <br />
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-6">
              <b>name</b>
            </div>
            <div className="col-md-2">
              <b>qty</b>
            </div>
            <div className="col-md-2">
              <b>price</b>
            </div>
          </div>
          {cart.map((item, index) => (
            <div className="row" key={index}>
              <div className="col-md-2" />
              <div className="col-md-6">{item.donut.name}</div>
              <div className="col-md-2">{item.qty}</div>
              <div className="col-md-2">${item.donut.price}</div>
            </div>
          ))}
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-6" />
            <div className="col-md-2">total</div>
            <div className="col-md-2">
              $
              {cart
                .reduce((acc, item) => {
                  return acc + item.donut.price * item.qty;
                }, 0)
                .toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckout;
