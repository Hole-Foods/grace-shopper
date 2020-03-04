import React, { useEffect } from 'react'; // don't forget to import useEffect
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // import redux hooks
import { fetchDonuts } from '../store/donuts';
import styled from 'styled-components';

const AllDonuts = () => {
  // declare dispatch function - always when you need dispatch
  const dispatch = useDispatch();

  // just like map state to props but assigning to a const variable
  const donuts = useSelector(state => state.donuts);

  // just like component did mount
  useEffect(() => {
    dispatch(fetchDonuts());
  }, []);

  return (
    <div className="container">
      <div className="row">
        {donuts.map(donut => (
          <DefaultDiv key={donut.id}>
            <div className="col">
              <div className="card">
                <Link to={`/donuts/${donut.id}`}>
                  <img src={donut.imageUrl} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{donut.name}</h5>
                    <p className="card-text">${donut.price}</p>
                    <button href="#" className="btn btn-primary">
                      Add to cart
                    </button>
                  </div>
                </Link>
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
