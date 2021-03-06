import React from 'react';
import styled from 'styled-components';

const SingleOrder = props => {
  const { orders } = props;

  return (
    <div className="row">
      {orders.map(order => (
        <DefaultDiv key={order.id}>
          <div className="col-sm">
            <div className="card">
              <div className="card-body">
                <p>
                  <small className="text-muted">Order Number: {order.id}</small>
                </p>
                <div className="card-text">
                  {order.orderItems.map(item => {
                    return (
                      <ul key={item.id}>
                        <li>Donut: {item.donut.name}</li>
                        <li>Price: {item.price}</li>
                        <li>QTY: {item.qty}</li>
                      </ul>
                    );
                  })}
                </div>
                <p>
                  <small className="text-muted">Submitted by User</small>
                </p>
              </div>
            </div>
          </div>
        </DefaultDiv>
      ))}
    </div>
  );
};

export default SingleOrder;

const DefaultDiv = styled.div`
  color: #000000;
  padding: 4px;
`;
