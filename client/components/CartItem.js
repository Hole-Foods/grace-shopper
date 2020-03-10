import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addItemToCart, deleteItemFromCart } from '../store/cart';
import { Link } from 'react-router-dom';

export const dollaDollaBillzYall = total => {
  const decimalized = parseFloat(total).toFixed(2);
  return decimalized;
};

const CartItem = props => {
  if (!props.item) {
    return <div>500 the donut expl💥ded</div>;
  }
  const { item } = props;

  const dispatch = useDispatch();

  const addToCart = () => {
    if (item.qty < item.donut.qty) {
      dispatch(addItemToCart({ donutId: item.donutId, qty: 1 }));
    }
  };

  const subtractFromCart = () => {
    if (item.qty > 0) {
      dispatch(addItemToCart({ donutId: item.donutId, qty: -1 }));
    }
  };

  const deleteFromCart = () => {
    dispatch(deleteItemFromCart(item.donutId));
  };

  return (
    <>
      <DefaultDiv>
        <div className="row">
          <div className="col">
            <Link to={`/donuts/${item.donutId}`}>{item.donut.name}</Link>
            <button className="btn" onClick={deleteFromCart}>
              x
            </button>
          </div>
          <div className="col">${item.donut.price}</div>
          <div className="col">
            <button
              className="btn"
              disabled={item.qty <= 0}
              onClick={subtractFromCart}
            >
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
