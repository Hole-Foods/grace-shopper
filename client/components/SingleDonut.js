import React, { useEffect } from 'react';
import styled from 'styled-components';
import { fetchSingleDonut } from '../store/donut';

const SingleDonut = props => {
  return (
    <>
      <DefaultDiv>
        <div className="container">
          <div className="row">
            <div className="col">One of three columns</div>
            <div className="col">One of three columns</div>
            <div className="col">One of three columns</div>
          </div>
        </div>
      </DefaultDiv>
    </>
  );
};

const DefaultDiv = styled.div`
  font-size: 16px;
  color: #000000;
`;

export default SingleDonut;
