import React from 'react';
import styled from 'styled-components';
import { CardElement } from '@stripe/react-stripe-js';
// import './CardSectionStyles.css';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CardSection = () => {
  return (
    <label>
      Card Info
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  );
};

export default CardSection;
