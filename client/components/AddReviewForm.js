import React from 'react';
import { useForm } from 'react-hook-form';

const AddReviewForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-muted">
          Your rating &nbsp;
          <select name="Rating" ref={register({ required: true })}>
            <option value="1">1</option>
            <option value=" 2"> 2</option>
            <option value=" 3"> 3</option>
            <option value=" 4"> 4</option>
            <option value=" 5"> 5</option>
          </select>
        </label>
        <textarea
          type="text"
          wrap="hard"
          placeholder="What did you like? What can we do better? Let us know here!"
          name="Add Review"
          style={{ height: '75px', width: '100%' }}
          ref={register({ required: true, maxLength: 250 })}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReviewForm;
