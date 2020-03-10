import React from 'react';
import SingleOrder from './SingleOrder';

const OrderList = props => {
  const { orders } = props;

  if (!props.orders || !props.orders.length) {
    return <div>No orders</div>;
  }

  return (
    <div>
      <SingleOrder orders={orders} />
    </div>
  );
};

export default OrderList;
