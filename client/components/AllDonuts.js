import React, { useEffect } from 'react'; // don't forget to import useEffect
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // import redux hooks
import { fetchDonuts } from '../store/donuts';

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
    <div>
      test
      {donuts.map(donut => (
        <div key={donut.id} className="donut row">
          <Link to={`/donuts/${donut.id}`}>
            <img src={donut.imageUrl} />
            <p>{donut.name}</p>
          </Link>
        </div>
      ))}
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
