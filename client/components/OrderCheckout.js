import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { submitOrder } from '../store/order';

// REMOVE BELOW
import { fetchCart } from '../store/cart';

//

const OrderCheckout = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  // WILL PASS AS PROPS BUT CALL FOR NOW - REMOVE BELOW
  const { cart, user } = useSelector(state => {
    return {
      cart: state.cart,
      user: state.user,
    };
  });

  useEffect(() => {
    dispatch(fetchCart(user.id));
  }, []);

  //
  if (!user.email) {
    return <h1>4🍩4 Page Not Found</h1>;
  }

  const divStyle = src => ({
    backgroundImage: `url(${src})`,
    height: '95px',
    width: '100%',
    backgroundSize: 'cover',
    overflow: 'none',
  });

  const onSubmit = data => {
    dispatch(submitOrder(data));
  };

  // NEEDS VALIDATION
  console.log(errors);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          Shipping Info
          <br />
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group col-md-12">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                ref={register({ required: true })}
              />
            </div>
            <div className="form-group col-md-12">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                ref={register}
              />
            </div>

            <div className="form-group col-md-12">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 Main St"
                name="address1"
                ref={register({ required: true })}
              />
            </div>
            <div className="form-group col-md-12">
              <label>Address 2</label>
              <input
                type="text"
                className="form-control"
                placeholder="Apartment, studio, or floor"
                name="address2"
                ref={register}
              />
            </div>

            <div className="form-group col-md-12">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                ref={register({ required: true })}
              />
            </div>
            <div className="form-group col-md-12">
              <label>State</label>
              <input
                type="text"
                className="form-control"
                placeholder="State"
                name="state"
                ref={register({
                  required: true,
                })}
              />
            </div>
            <div className="form-group col-md-12">
              <label>Zip</label>
              <input
                type="text"
                className="form-control"
                placeholder="Zip"
                name="zip"
                ref={register({
                  required: true,
                  pattern: /^\d{5}(-\d{4})?$/i,
                })}
              />
            </div>

            <div className="form-group col-md-12">
              <label>Country</label>
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                name="country"
                ref={register}
              />
            </div>
            <button type="submit" className="btn btn-primary float-right">
              Submit Order
            </button>
          </form>
        </div>
        <div className="col-md-6">
          Cart Summary
          <br />
          <br />
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-6">name</div>
            <div className="col-md-2">qty</div>
            <div className="col-md-2">price</div>
          </div>
          {cart.map((item, index) => (
            <div className="row" key={index}>
              <div className="col-md-2" style={divStyle(item.donut.imageUrl)} />

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
              {cart.reduce((acc, item) => {
                return acc + item.donut.price * item.qty;
              }, 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckout;
