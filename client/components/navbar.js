import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <nav className="navbar navbar-light bg-light sticky-top">
    <h1>HOLE FOODS</h1>
    <div className="float-right">
      {isLoggedIn ? (
        <>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="nav-item">
            Home
          </Link>
          <a href="#" onClick={handleClick} className="nav-item">
            Logout
          </a>
        </>
      ) : (
        <>
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="nav-item">
            Login
          </Link>
          <Link to="/signup" className="nav-item">
            Sign Up
          </Link>
        </>
      )}
      {isAdmin && (
        <>
          <Link to="/admin" className="nav-item">
            Admin Dash
          </Link>
        </>
      )}
      <>
        <Link to="/donuts" className="nav-item">
          All Donuts
        </Link>
        <Link to="/cart" className='"nav-item"'>
          Cart
        </Link>
      </>
    </div>
    <hr />
  </nav>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
