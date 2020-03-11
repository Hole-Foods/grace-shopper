import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FadeIn from 'react-fade-in';
import { clearCart } from '../store/cart';

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const { order } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <>
      <FadeIn transitionDuration="1000">
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
                <div className="row">
                  <a href={`${order.receiptUrl}`}>
                    Order receipt: {`${order.chargeId}`}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              Order Summary
              <br />
              <br />
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-6">
                  <b>name</b>
                </div>
                <div className="col-md-2">
                  <b>qty</b>
                </div>
                <div className="col-md-2">
                  <b>price</b>
                </div>
              </div>
              {order.items.map((item, index) => (
                <div className="row" key={index}>
                  <div className="col-md-2" />
                  <div className="col-md-6">{item.donut.name}</div>
                  <div className="col-md-2">{item.qty}</div>
                  <div className="col-md-2">${item.donut.price}</div>
                </div>
              ))}
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-6" />
                <div className="col-md-2">total</div>
                <div className="col-md-2">
                  $
                  {order.items
                    .reduce((acc, item) => {
                      return acc + item.donut.price * item.qty;
                    }, 0)
                    .toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default OrderConfirmation;
