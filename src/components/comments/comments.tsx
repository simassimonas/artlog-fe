import { useContext, useState } from 'react';
import { IComment } from '../../common/interfaces/comment.interface';
import './comments.scss';
import { AuthContext } from '../../context/auth.context';
import defaultProfileImg from '../../assets/default-profile.png';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from '../../common/utils';
import Comment from '../comment/comment';

const Comments = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');
  const { loggedInUser } = useContext(AuthContext);

  const { data: comments } = useQuery(['comments', postId], () =>
    axiosRequest.get(`/posts/${postId}/comments`).then((res) => {
      return res.data;
    })
  );

  const newCommentMutation = useMutation(
    (content: string) => {
      return axiosRequest.post(`/posts/${postId}/comments`, { content });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', postId]);
      },
    }
  );

  const handleNewComment = async (e: any) => {
    e.preventDefault();
    newCommentMutation.mutate(newComment);
    setNewComment('');
  };

  return (
    <div className="comments">
      <div className="comments__write">
        <img
          src={
            loggedInUser?.profilePic
              ? `${process.env.REACT_APP_API}/users/images/${loggedInUser?.profilePic}`
              : defaultProfileImg
          }
          alt="user profile"
        />
        <input
          type="text"
          placeholder="leave a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="action-button"
          onClick={handleNewComment}
          disabled={!newComment.trim()}
        >
          Send
        </button>
      </div>
      <div className="comments__content">
        {comments?.map((comment: IComment) => (
          <Comment key={comment?._id} comment={comment}></Comment>
        ))}
      </div>
    </div>
  );
};

export default Comments;
