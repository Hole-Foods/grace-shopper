import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewReview } from '../store/reviews';
import { useForm } from 'react-hook-form';

const AddReviewForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const { donut, user } = useSelector(state => {
    return {
      user: state.user,
      donut: state.singleDonut,
    };
  });

  const onSubmit = data => {
    data.userId = user.id;
    data.donutId = donut.id;
    if (typeof data.rating === 'string') data.rating = parseInt(data.rating);
    if (!user.id && !user.email) {
      alert('Please log in to add a review!');
    } else {
      dispatch(addNewReview(data));
      reset();
    }
  };

  return (
    <div className="container">
      <form id="add-review" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-muted">
          Your rating &nbsp;
          <select name="rating" ref={register({ required: true })}>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="3">2</option>
            <option value="1">1</option>
          </select>
        </label>
        <textarea
          type="text"
          wrap="hard"
          placeholder="What did you like? What can we do better? Let us know here!"
          name="content"
          style={{ height: '75px', width: '100%' }}
          ref={register({ required: true, maxLength: 250 })}
        />
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
