import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createDonut } from '../store/donuts';

const AddDonutForm = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const { user } = useSelector(state => {
    return {
      user: state.user,
    };
  });

  const onSubmit = data => {
    if (typeof data.price === 'string') data.price = parseInt(data.price);
    if (typeof data.qty === 'string') data.qty = parseInt(data.qty);
    if (data.description.length === 0) data.description = undefined;
    dispatch(createDonut(data));
  };

  if (!user.isAdmin) return <h1>4🍩4 Page Not Found</h1>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Add New Donut</h1>
      <input
        type="text"
        placeholder="Donut Name"
        name="name"
        ref={register({ required: true, maxLength: 80 })}
      />
      <br />
      {errors.name && (
        <span className="alert-warning">unique donut name is required</span>
      )}
      <br />
      <textarea
        name="description"
        placeholder="description"
        ref={register({ maxLength: 250 })}
      />
      <br />
      <br />
      <input
        type="number"
        placeholder="Price"
        name="price"
        ref={register({ required: true, max: 100, min: 0 })}
      />
      <br />
      {errors.price && (
        <span className="alert-warning">donut price is required</span>
      )}
      <br />
      <input
        type="number"
        placeholder="Inventory"
        name="qty"
        ref={register({ required: true })}
      />
      <br />
      {errors.qty && (
        <span className="alert-warning">donut qty is required</span>
      )}
      <br />
      <input
        type="text"
        placeholder="Image URL"
        name="imageUrl"
        ref={register({ required: true })}
      />
      <br />
      {errors.imageUrl && (
        <span className="alert-warning">donut image url is required</span>
      )}
      <br />

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AddDonutForm;
