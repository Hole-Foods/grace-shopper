import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import styled from 'styled-components';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const cart = useSelector(state => state.cart);
  return (
    <nav className="navbar navbar-light bg-light sticky-top">
      <img src="images/logo.gif" height="75px" width="78px" />
      <Header>HOLE FOODS</Header>
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
        <>
          <Link to="/donuts" className="nav-item">
            All Donuts
          </Link>
          <Link to="/cart" className='"nav-item"'>
            Cart&nbsp;
            <span className="badge badge-primary">
              {cart.reduce((acc, item) => {
                return acc + item.qty;
              }, 0)}
            </span>
          </Link>
        </>
        {isAdmin && (
          <>
            <Link to="/admin" className="nav-item">
              Admin Dash
            </Link>
          </>
        )}
      </div>
      <hr />
    </nav>
  );
};
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

const Header = styled.h1`
  margin-left: 15px;
`;
