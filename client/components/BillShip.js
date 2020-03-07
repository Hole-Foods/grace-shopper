import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { submitOrder } from '../store/order';
import styled from 'styled-components';

const BillShip = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
    dispatch(submitOrder(data));
  };

  // NEEDS VALIDATION
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Address1"
        name="address1"
        ref={register({ required: true })}
      />
      <input
        type="text"
        placeholder="Address2"
        name="address2"
        ref={register}
      />
      <input
        type="text"
        placeholder="City"
        name="city"
        ref={register({ required: true })}
      />
      <input
        type="text"
        placeholder="State"
        name="state"
        ref={register({
          required: true,
        })}
      />
      <input
        type="text"
        placeholder="Zip"
        name="zip"
        ref={register({ required: true, pattern: /^\d{5}(-\d{4})?$/i })}
      />
      <input type="text" placeholder="Country" name="country" ref={register} />
      <input type="submit" />
    </form>
  );
};

export default BillShip;
