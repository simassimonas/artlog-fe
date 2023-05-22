import React, { useEffect, useState } from 'react';
import './conversations.scss';
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { axiosRequest, useDebounce } from '../../../common/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { InView } from 'react-intersection-observer';
import { IUser } from '../../../common/interfaces/user.interface';
import Conversation from '../conversation/conversation';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Conversations = ({ limit = 20, onSelectUser }: any) => {
  const navigate = useNavigate();
  const userIdParam: string | undefined = useParams().id;
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 600);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectUser = (user: IUser) => {
    setSelectedUser(user);
    onSelectUser(user);
    if (userIdParam !== user._id) {
      navigate(`/chat/${user._id}`);
    }
  };

  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['users', debouncedSearchQuery],
    async ({ pageParam = 0 }) => {
      const res = await axiosRequest.get(
        `/users/search?page=${pageParam}&limit=${limit}&sortDirection=desc&query=${debouncedSearchQuery}`
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

  useEffect(() => {
    if (userIdParam) {
      axiosRequest
        .get(`/users/${userIdParam}`)
        .then((response: AxiosResponse) => {
          const user: IUser = response.data;
          if (user) {
            handleSelectUser(user);
          }
        });
    }
  }, [userIdParam]);

  useEffect(() => {
    if (allUsers.length > 0 && !selectedUser) {
      const userFromUrlInAllUsers = allUsers.find(
        (user) => user._id === userIdParam
      );
      if (!userFromUrlInAllUsers) {
        handleSelectUser(allUsers[0]);
      }
    }
  }, [allUsers, selectedUser]);

  const SearchField = () => (
    <TextField
      autoFocus={true}
      fullWidth
      color="secondary"
      size="small"
      placeholder="Search for..."
      onChange={(e) => setSearchQuery(e.target.value)}
      value={searchQuery}
      InputProps={{
        style: {
          padding: 5,
          fontSize: 14,
        },
        startAdornment: !open && (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <div className="conversations">
      <div className="conversations__search">
        <div className="conversations__search-large">
          <SearchField />
        </div>

        <div className="conversations__search-mobile">
          <IconButton onClick={handleClick}>
            <SearchIcon fontSize="large" className="post__menu-icon" />
          </IconButton>
          <Popover
            id="simple-popover"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <SearchField />
          </Popover>
        </div>
      </div>

      <div className="conversations__list">
        {error ? (
          <div className="error-message">Something went wrong!</div>
        ) : isLoading ? (
          <CircularProgress />
        ) : allUsers?.length === 0 ? (
          'No users found'
        ) : (
          allUsers?.map((user: any) => (
            <div
              key={user?._id}
              onClick={() => handleSelectUser(user)}
              className={`conversations__list-item ${
                selectedUser?._id === user._id ? 'selected' : ''
              }`}
            >
              <Conversation key={user?._id} user={user}></Conversation>
            </div>
          ))
        )}
        {isFetchingNextPage && <CircularProgress />}
        <InView onChange={observerCallback} threshold={1}>
          <div style={{ height: 1 }}></div>
        </InView>
      </div>
    </div>
  );
};

export default Conversations;
