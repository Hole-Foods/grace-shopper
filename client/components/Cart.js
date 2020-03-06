import React, { useEffect } from 'react'; // don't forget to import useEffect
import { useDispatch, useSelector } from 'react-redux'; // import redux hooks
import { fetchCart } from '../store/cart';
import styled from 'styled-components';
import CartItem from './CartItem';

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
  return (
    <>
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
              {cart.reduce((acc, item) => {
                return acc + item.donut.price * item.qty;
              }, 0)}
            </div>
          </div>
        </div>
      </DefaultDiv>
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
