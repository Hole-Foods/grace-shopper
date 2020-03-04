import React from 'react';
import styled from 'styled-components';

const Default = () => {
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

export default Default;

const DefaultDiv = styled.div`
  font-size: 16px;
  color: #000000;
`;
