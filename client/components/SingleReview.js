import React from 'react';
import styled from 'styled-components';

const SingleReview = props => {
  const { review } = props;

  return (
    <DefaultDiv>
      <div className="col-sm">
        <div className="card">
          <div className="card-body">
            <p>
              <small className="text-muted">Rating: {review.rating}</small>
            </p>
            <p className="card-text">{review.content}</p>
            <p>
              <small className="text-muted">
                Submitted on {new Date(review.createdAt).toString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    </DefaultDiv>
  );
};

export default SingleReview;

const DefaultDiv = styled.div`
  width: 100%;
  color: #000000;
  padding: 4px;
`;
