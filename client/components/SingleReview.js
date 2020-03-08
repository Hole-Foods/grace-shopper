import React from 'react';
import styled from 'styled-components';

const SingleReview = props => {
  const { reviews } = props;

  return (
    <div className="row">
      {reviews.map(review => (
        <DefaultDiv key={review.id}>
          <div className="col-sm">
            <div className="card">
              <div className="card-body">
                <p className="card-title">Stars: {review.rating}</p>
                <p className="card-text">{review.content}</p>
              </div>
            </div>
          </div>
        </DefaultDiv>
      ))}
    </div>
  );
};

export default SingleReview;

const DefaultDiv = styled.div`
  color: #000000;
  padding: 4px;
`;
