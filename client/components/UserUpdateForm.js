import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { submitUpdate } from '../store/userInfo.js';

const UpdateUser = props => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const { address } = props;

  const divStyle = src => ({
    backgroundImage: `url(${src})`,
    height: '95px',
    width: '100%',
    backgroundSize: 'cover',
    overflow: 'none',
  });

  const onSubmit = (userId, data) => {
    dispatch(submitUpdate(userId, data));
  };

  // NEEDS VALIDATION
  console.log(errors);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          Update Shipping Info
          <br />
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group col-md-12">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                defaultValue={props.address.firstName}
                ref={register({ required: true })}
              />
            </div>
            <div className="form-group col-md-12">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                defaultValue={address.lastName}
                ref={register}
              />
            </div>

            <div className="form-group col-md-12">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 Main St"
                name="address1"
                defaultValue={address.address1}
                ref={register({ required: true })}
              />
            </div>
            <div className="form-group col-md-12">
              <label>Address 2</label>
              <input
                type="text"
                className="form-control"
                placeholder="Apartment, studio, or floor"
                name="address2"
                defaultValue={address.address2}
                ref={register}
              />
            </div>

            <div className="form-group col-md-12">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                defaultValue={address.city}
                ref={register({ required: true })}
              />
            </div>
            <div className="form-group col-md-12">
              <label>State</label>
              <input
                type="text"
                className="form-control"
                placeholder="State"
                name="state"
                defaultValue={address.state}
                ref={register({
                  required: true,
                })}
              />
            </div>
            <div className="form-group col-md-12">
              <label>Zip</label>
              <input
                type="text"
                className="form-control"
                placeholder="Zip"
                name="zip"
                defaultValue={address.zip}
                ref={register({
                  required: true,
                  pattern: /^\d{5}(-\d{4})?$/i,
                })}
              />
            </div>

            <div className="form-group col-md-12">
              <label>Country</label>
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                name="country"
                defaultValue={address.country}
                ref={register}
              />
            </div>
            <button type="submit" className="btn btn-primary float-right">
              Submit Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
