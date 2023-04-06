import React, { useContext, useState } from 'react';
import { IComment } from '../../common/interfaces/comment.interface';
import { IUser } from '../../common/interfaces/user.interface';
import './comments.scss';
import { AuthContext } from '../../context/auth.context';

const Comments = () => {
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);
  const mockUser: IUser = {
    _id: '123',
    username: 'simassimonas',
    name: 'Simas Simonas',
    profilePic:
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

  const handleClick = async (e: any) => {
    e.preventDefault();
    // mutation.mutate({ desc, postId });
    // setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={'/upload/' + user?.profilePic} alt="" />
        <input
          type="text"
          placeholder="leave a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="action-button" onClick={handleClick}>
          Send
        </button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.user.profilePic} alt="user"></img>
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
