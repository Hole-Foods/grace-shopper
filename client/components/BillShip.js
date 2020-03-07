import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { submitOrder } from '../store/cart';
import styled from 'styled-components';

const BillShip = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  // NEEDS VALIDATION
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="First name"
        name="First name"
        ref={register({ required: true, maxLength: 80 })}
      />
      <input
        type="text"
        placeholder="Last name"
        name="Last name"
        ref={register({ required: true, maxLength: 100 })}
      />
      <input
        type="text"
        placeholder="Email"
        name="Email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      <input
        type="tel"
        placeholder="Phone"
        name="Phone"
        ref={register({ required: true, maxLength: 12 })}
      />
      <input
        type="text"
        placeholder="Address1"
        name="Address1"
        ref={register({ required: true })}
      />
      <input
        type="text"
        placeholder="Address2"
        name="Address2"
        ref={register}
      />
      <input
        type="text"
        placeholder="City"
        name="City"
        ref={register({ required: true })}
      />
      <input
        type="text"
        placeholder="State"
        name="State"
        ref={register({
          required: true,
        })}
      />
      <input
        type="text"
        placeholder="Zip"
        name="Zip"
        ref={register({ required: true, pattern: /^\d{5}(-\d{4})?$/i })}
      />

      <input type="submit" />
    </form>
  );
};

export default BillShip;
