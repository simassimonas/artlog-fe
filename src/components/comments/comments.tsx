import React from 'react';
import { IComment } from '../../common/interfaces/comment.interface';
import { IUser } from '../../common/interfaces/user.interface';
import './comments.scss';

const Comments = () => {
  const mockUser: IUser = {
    id: '123',
    username: 'simassimonas',
    name: 'Simas Simonas',
    profile_pic:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
  };

  const comments: IComment[] = [
    {
      date: '1 hour ago',
      comment: 'very nice picture good job',
      user: mockUser,
    },
    {
      date: '1 hour ago',
      comment:
        'very nice picture good jobbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbjobbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbjobbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      user: mockUser,
    },
    {
      date: '1 hour ago',
      comment: 'very nice picture good job',
      user: mockUser,
    },
  ];

  return (
    <div className="comments">
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.user.profile_pic} alt="user"></img>
          <div className="info">
            <span>{comment.user.name}</span>
            <p>{comment.comment}</p>
          </div>
          <span className="date">{comment.date}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
