import React, { useState } from 'react';
import './posts.scss';
import { IUser } from '../../common/interfaces/user.interface';
import { IPost } from '../../common/interfaces/post.interface';
import Post from '../post/post';

export const Posts = () => {
  //const [inputValue, setInputValue] = useState(initialValue);

  const mockUser: IUser = {
    id: '123',
    username: 'simassimonas',
    name: 'Simas Simonas',
    profile_pic:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
  };

  const mockPosts: IPost[] = [
    {
      id: '1',
      img: 'https://www.actuia.com/wp-content/uploads/2022/09/oeuvre-art-generee-IA-MidJourney-remporte-1er-prix-Colorado-State-Fair.png',
      user: mockUser,
    },
    {
      id: '1',
      img: 'https://www.actuia.com/wp-content/uploads/2022/09/oeuvre-art-generee-IA-MidJourney-remporte-1er-prix-Colorado-State-Fair.png',
      user: mockUser,
    },
  ];

  return (
    <div className="posts">
      {mockPosts.map((post) => (
        <Post post={post}></Post>
      ))}
    </div>
  );
};

export default Posts;
