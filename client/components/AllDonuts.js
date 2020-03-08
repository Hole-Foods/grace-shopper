import React, { useEffect } from 'react'; // don't forget to import useEffect
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // import redux hooks
import { fetchDonuts } from '../store/donuts';
import { addItemToCart } from '../store/cart';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import InfiniteScroll from 'react-infinite-scroll-component';

const AllDonuts = () => {
  // declare dispatch function - always when you need dispatch
  const dispatch = useDispatch();

  // just like map state to props but assigning to a const variable
  const donuts = useSelector(state => state.donuts);

  // just like component did mount
  useEffect(() => {
    dispatch(fetchDonuts());
  }, []);

  const addToCart = donutId => {
    dispatch(addItemToCart({ donutId, qty: 1 }));
  };

  return (
    <div className="container">
      <div className="row">
        {donuts.map(donut => (
          <DefaultDiv key={donut.id}>
            <div className="col-md">
              <div className="card">
                <Link to={`/donuts/${donut.id}`}>
                  <FadeIn transitionDuration="1000">
                    <img src={donut.imageUrl} className="card-img-top" />
                  </FadeIn>
                </Link>
                <div className="card-body">
                  <Link to={`/donuts/${donut.id}`}>
                    <h5 className="card-title">{donut.name}</h5>
                  </Link>
                  <p className="card-text">${donut.price}</p>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => addToCart(donut.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </DefaultDiv>
        ))}
      </div>
    </div>
  );
};

export default AllDonuts;
// const mapStateToProps = state => {
//   return {
//     donuts: state.donuts,
//   };
// };

// export default connect(mapStateToProps)(AllDonuts);
const DefaultDiv = styled.div`
  max-width: 18rem;
  max-height: 25rem;
`;
