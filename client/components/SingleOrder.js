import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // import redux hooks
import { fetchDonuts } from '../store/donuts';
import styled from 'styled-components';

const SingleOrder = props => {
  const { orders } = props;

  // const dispatch = useDispatch();

  // const { donuts } = useSelector(state => {
  //   return {
  //     donuts: state.donuts,
  //   };
  // });

  // useEffect(() => {
  //   dispatch(fetchDonuts());
  // }, []);
  console.log('ORDERS: ', orders);

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
                    console.log('ITEM: ', item);
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
