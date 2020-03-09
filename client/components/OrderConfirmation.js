import React from 'react';
import { useSelector } from 'react-redux';

const OrderConfirmation = () => {
  const { order } = useSelector(state => state.order);

  const divStyle = src => ({
    backgroundImage: `url(${src})`,
    height: '95px',
    width: '100%',
    backgroundSize: 'cover',
    overflow: 'none',
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            Thank you for your order!
            <br />
            <br />
            Order Number: {order.id}
            <br />
            <br />
            Shipping Address:
            <br />
            <div className="col-md-12">
              <div className="row">{`${order.firstName} ${order.lastName}`}</div>
              <div className="row">{`${order.address1}`}</div>
              {order.address2 ? (
                <div className="row">{`${order.address2}`}</div>
              ) : null}
              <div className="row">{`${order.city}, ${order.state} ${order.zip}`}</div>
            </div>
          </div>
          <div className="col-md-6">
            Order Summary
            <br />
            <br />
            <div className="row">
              <div className="col-md-2" />
              <div className="col-md-6">name</div>
              <div className="col-md-2">qty</div>
              <div className="col-md-2">price</div>
            </div>
            {order.items.map((item, index) => (
              <div className="row" key={index}>
                <div
                  className="col-md-2"
                  style={divStyle(item.donut.imageUrl)}
                />

                <div className="col-md-6">{item.donut.name}</div>
                <div className="col-md-2">{item.qty}</div>
                <div className="col-md-2">{item.donut.price}</div>
              </div>
            ))}
            <div className="row">
              <div className="col-md-2" />
              <div className="col-md-6" />
              <div className="col-md-2">total</div>
              <div className="col-md-2">
                $
                {order.items.reduce((acc, item) => {
                  return acc + item.donut.price * item.qty;
                }, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
