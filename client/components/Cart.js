import React, { useEffect } from 'react'; // don't forget to import useEffect
import { useDispatch, useSelector } from 'react-redux'; // import redux hooks
import { fetchCart } from '../store/cart';
import styled from 'styled-components';
import CartItem, { dollaDollaBillzYall } from './CartItem';
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';

const Cart = () => {
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

  if (cart.length === 0) {
    return <div>N🍩 donuts in cart</div>;
  }

  return (
    <>
      <FadeIn transitionDuration="1000">
        <DefaultDiv>
          <h1>Cart</h1>
          <div className="container">
            <div className="row">
              <div className="col">Donut Name</div>
              <div className="col">Price per Donut</div>
              <div className="col">Quantity</div>
              <div className="col">Price</div>
            </div>
            {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
            <div className="row">
              <div className="col" />
              <div className="col" />
              <div className="col">Total</div>
              <div className="col">
                $
                {dollaDollaBillzYall(
                  cart.reduce((acc, item) => {
                    return acc + item.donut.price * item.qty;
                  }, 0)
                )}
              </div>
            </div>
            <div className="row">
              {user.email ? (
                <Link to="/checkout">
                  <button className="btn btn-primary">Checkout</button>
                </Link>
              ) : (
                <div>
                  <Link to="/login">
                    <button className="btn btn-primary">Log In</button>
                  </Link>
                  or
                  <Link to="/signup">
                    <button className="btn btn-primary">Sign Up</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </DefaultDiv>
      </FadeIn>
    </>
  );
};

export default Cart;

const DefaultDiv = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  padding: 4px;
`;
