import React, { useState } from 'react';
import './posts.scss';
import { IUser } from '../../common/interfaces/user.interface';
import { IPost } from '../../common/interfaces/post.interface';
import Post from '../post/post';
import { useQuery } from '@tanstack/react-query';
import { axiosRequest } from '../../common/utils';

export const Posts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      axiosRequest.get('/posts').then((res) => {
        return res.data;
      }),
  });

  console.log('laaaaaaaaa', data);

  // const mockUser: IUser = {
  //   _id: '123',
  //   username: 'simassimonas',
  //   name: 'simas simonas',
  //   profilePic:
  //     'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
  // };

  // const mockPosts: IPost[] = [
  //   {
  //     id: '1',
  //     img: 'https://www.actuia.com/wp-content/uploads/2022/09/oeuvre-art-generee-IA-MidJourney-remporte-1er-prix-Colorado-State-Fair.png',
  //     userId: mockUser,
  //     artId:
  //   },
  //   {
  //     id: '1',
  //     img: 'https://www.actuia.com/wp-content/uploads/2022/09/oeuvre-art-generee-IA-MidJourney-remporte-1er-prix-Colorado-State-Fair.png',
  //     userId: mockUser,
  //   },
  // ];

  return (
    <div className="posts">
      <span>{}</span>
      {isLoading
        ? 'loading'
        : data?.map((post: any) => <Post key={post._id} post={post}></Post>)}
    </div>
  );
};

export default Posts;
