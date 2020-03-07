import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/cart';

export const dollaDollaBillzYall = total => {
  const decimalized = parseFloat(total).toFixed(2);
  return decimalized;
};

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
    if (item.qty > 0) {
      dispatch(addItemToCart({ donutId: item.donutId, qty: -1 }));
    }
  };

  return (
    <>
      <DefaultDiv>
        <div className="row">
          <div className="col">{item.donut.name}</div>
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
          <div className="col">
            ${dollaDollaBillzYall(item.donut.price * item.qty)}
          </div>
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
