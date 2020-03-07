import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/cart';
import { Link } from 'react-router-dom';

const CartItem = props => {
  if (!props.item) {
    return <div>4🍩4 no donut found</div>;
  }
  const { item } = props;

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItemToCart({ donutId: item.donutId, qty: 1 }));
  };

  const subtractFromCart = () => {
    dispatch(addItemToCart({ donutId: item.donutId, qty: -1 }));
  };

  return (
    <>
      <DefaultDiv>
        <div className="row">
          <div className="col">
            <Link to={`/donuts/${item.donutId}`}>{item.donut.name}</Link>
          </div>
          <div className="col">${item.donut.price}</div>
          <div className="col">
            <button className="btn" onClick={subtractFromCart}>
              -
            </button>
            {item.qty}
            <button className="btn" onClick={addToCart}>
              +
            </button>
          </div>
          <div className="col">${item.donut.price * item.qty}</div>
        </div>
      </DefaultDiv>
    </>
  );
};

export default CartItem;

const DefaultDiv = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: #000000;
  padding: 4px;
`;
