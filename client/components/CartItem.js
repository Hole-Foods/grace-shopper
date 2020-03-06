import React from 'react';
import styled from 'styled-components';

const CartItem = props => {
  const { item } = props;
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
