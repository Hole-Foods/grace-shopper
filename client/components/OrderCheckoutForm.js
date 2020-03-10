import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
// Stripe
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { submitOrder } from '../store/order';

import OrderCheckoutCardSection from './OrderCheckoutCardSection';

const OrderCheckoutForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  // Stripe
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async data => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const billingInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address_line1: `${data.address1}`,
      address_line2: `${data.address2}`,
      address_city: `${data.city}`,
      address_state: `${data.state}`,
      address_zip: `${data.zip}`,
    };

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card, billingInfo);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      data.token = result.token;
    }

    dispatch(submitOrder(data));
  };

  // NEEDS VALIDATION
  console.log(errors);

  return (
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
        {errors.firstName && (
          <span className="alert-warning">First name is required</span>
        )}
      </div>
      <div className="form-group col-md-12">
        <label>Last Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          name="lastName"
          ref={register({ required: true })}
        />
        {errors.lastName && (
          <span className="alert-warning">Last name is required</span>
        )}
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
        {errors.address1 && (
          <span className="alert-warning">Address is required</span>
        )}
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
        {errors.city && <span className="alert-warning">City is required</span>}
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
        {errors.state && (
          <span className="alert-warning">State is required</span>
        )}
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
        {errors.zip && (
          <span className="alert-warning">Zip code is required</span>
        )}
      </div>
      <div className="form-group col-md-12">
        <OrderCheckoutCardSection />
      </div>
      <button
        type="submit"
        className="btn btn-primary float-right"
        disabled={!stripe}
      >
        Submit Order
      </button>
    </form>
  );
};

export default OrderCheckoutForm;
