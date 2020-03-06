import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleDonut } from '../store/donut';
import { addItemToCart } from '../store/cart';

const CartItem = props => {
  const { item } = props;
  // console.log('ITEM: ', item);

  // // declare dispatch function - always when you need dispatch
  // const dispatch = useDispatch();

  // const [qty, setQty] = useState(item.qty);

  // const addToCart = () => {
  //   setQty(qty + 1);
  //   dispatch(addItemToCart({ donutId: item.donut.id, qty: 1 }));
  // };

  // const subtractFromCart = evt => {
  //   evt.preventDefault();
  //   const qty = parseInt(evt.target.qty.value);
  //   if (qty > 0 && qty <= donut.qty) {
  //     dispatch(
  //       addItemToCart({
  //         donutId: props.match.params.donutId,
  //         qty: qty,
  //       })
  //     );
  //   }
  // };

  //Subtract from cart will require a thunk
  //Must make sure user cannot go below 0 and charge us for donuts

  return (
    <>
      <DefaultDiv>
        <div className="row">
          <div className="col">{item.donut.name}</div>
          <div className="col">${item.donut.price}</div>
          <div className="col">
            <button className="btn">-</button>
            {item.qty}
            <button className="btn">+</button>
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
