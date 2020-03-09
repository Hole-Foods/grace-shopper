import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  UserHome,
  AllDonuts,
  Cart,
  OrderCheckout,
  OrderConfirmation,
  SingleDonut,
  AddDonutForm,
} from './components';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {/* <Route path="/donut/:donutId" component={SingleDonut} /> */}
        <Route path="/donuts/:donutId" component={SingleDonut} />
        <Route path="/admin/add-donut" component={AddDonutForm} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={OrderCheckout} />
        <Route path="/confirmation" component={OrderConfirmation} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/donuts" component={AllDonuts} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* <Route path="/admin/edit-donut" component={EditInventoryForm} />
            <Route path="/admin/all-orders" component={AllOrders} />
            <Route path="/admin/all-users" component={AllUsers} /> */}
        {/* Displays our Login component as a fallback */}
        <Route
          path="/:doesnotexist"
          render={() => <h1>4🍩4 Page Not Found</h1>}
        />
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
