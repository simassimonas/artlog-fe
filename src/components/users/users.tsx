import './users.scss';
import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosRequest } from '../../common/utils';
import CircularProgress from '@mui/material/CircularProgress';
import { InView } from 'react-intersection-observer';
import User from '../user/user';

export const Users = ({ searchQuery = '', limit = 20 }) => {
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['users', searchQuery],
    async ({ pageParam = 0 }) => {
      const res = await axiosRequest.get(
        `/users/search?page=${pageParam}&limit=${limit}&sortDirection=desc&query=${searchQuery}`
      );
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const observerCallback = (inView: boolean) => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  };

  const allUsers = data?.pages.flatMap((pageData) => pageData.users) || [];

  return (
    <div className="users">
      {error ? (
        <div className="error-message">Something went wrong!</div>
      ) : isLoading ? (
        <CircularProgress />
      ) : allUsers?.length === 0 ? (
        'No users found'
      ) : (
        allUsers?.map((user: any) => <User key={user?._id} user={user}></User>)
      )}
      {isFetchingNextPage && <CircularProgress />}
      <InView onChange={observerCallback} threshold={1}>
        <div style={{ height: 1 }}></div>
      </InView>
    </div>
  );
};

export default Users;
