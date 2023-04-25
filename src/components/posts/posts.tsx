import React, { useState, useCallback, useEffect } from 'react';
import './posts.scss';
import { IUser } from '../../common/interfaces/user.interface';
import { IPost } from '../../common/interfaces/post.interface';
import Post from '../post/post';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { axiosRequest } from '../../common/utils';
import CircularProgress from '@mui/material/CircularProgress';
import { InView } from 'react-intersection-observer';

type Endpoints = {
  [key: string]: string;
};

export const Posts = ({
  endpointName = 'feed',
  profileId = '',
  searchQuery = '',
  limit = 3,
}) => {
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['posts', endpointName, searchQuery],
    async ({ pageParam = 0 }) => {
      const endpoints: Endpoints = {
        feed: '/posts/feed?',
        profile: `/posts/profile/${profileId}?`,
        search: `/posts/search?query=${searchQuery}&`,
      };
      const endpoint = endpoints[endpointName];

      const res = await axiosRequest.get(
        `${endpoint}page=${pageParam}&limit=${limit}`
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

  const allPosts = data?.pages.flatMap((pageData) => pageData.posts) || [];

  return (
    <div className="posts">
      {error
        ? 'Something went wrong!'
        : allPosts?.map((post: any) => (
            <Post key={post?._id} post={post}></Post>
          ))}
      {(isLoading || isFetchingNextPage) && <CircularProgress />}

      {allPosts?.length == 0 && 'No posts found'}
      <InView onChange={observerCallback} threshold={1}>
        <div style={{ height: 1 }}></div>
      </InView>
    </div>
  );
};

export default Posts;
