import React, { useEffect } from 'react'; // don't forget to import useEffect
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // import redux hooks
import { fetchDonuts, deleteDonut } from '../store/donuts';
import { addItemToCart } from '../store/cart';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';

const AllDonuts = () => {
  const dispatch = useDispatch();

  const { donuts, user } = useSelector(state => {
    return { donuts: state.donuts, user: state.user };
  });

  useEffect(() => {
    dispatch(fetchDonuts());
  }, []);

  const addToCart = donutId => {
    dispatch(addItemToCart({ donutId, qty: 1 }));
  };

  const removeDonut = donutId => {
    dispatch(deleteDonut(donutId));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md">
          {user.isAdmin && (
            <Link to="/admin/add-donut">
              <button className="btn btn-primary">Add New Donut</button>
            </Link>
          )}
        </div>
      </div>
      <div className="row">
        {donuts.map(donut => (
          <DefaultDiv key={donut.id}>
            <div className="col-md">
              <div className="card mx-3 my-3">
                <Link to={`/donuts/${donut.id}`}>
                  <FadeIn transitionDuration="1000">
                    <img
                      src={donut.imageUrl}
                      className="card-img-top px-3 py-3"
                    />
                  </FadeIn>
                </Link>
                <div className="card-body">
                  <Link to={`/donuts/${donut.id}`}>
                    <h5 className="card-title">{donut.name}</h5>
                  </Link>
                  <p className="card-text text-muted">${donut.price}</p>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => addToCart(donut.id)}
                  >
                    Add to cart
                  </button>
                  {user.isAdmin && (
                    <button
                      className="btn btn-danger"
                      onClick={() => removeDonut(donut.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DefaultDiv>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default AllDonuts;

const DefaultDiv = styled.div`
  max-width: 18rem;
  max-height: 25rem;
`;
