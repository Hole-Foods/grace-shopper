import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const AllDonuts = props => {
  const donuts = props.donuts;

  return (
    <div>
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

const mapStateToProps = state => {
  return {
    donuts: state.donuts,
  };
};

export default connect(mapStateToProps)(AllDonuts);
