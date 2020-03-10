import React from 'react';
import ListedUser from './ListedUser';
import { fetchUsers } from '../store/users';

const AllUsers = () => {
  const dispatch = useDispatch();

  const { users, user } = useSelector(state => {
    return { users: state.donuts, user: state.user };
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (!user.isAdmin) {
    return <div></div>;
  }

  return (
    <div>
      <h1>Admin Dash</h1>
      <ListedUser reviews={reviews} />;
    </div>
  );
};

export default AllUsers;
