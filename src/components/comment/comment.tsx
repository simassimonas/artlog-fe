import { useContext, useState } from 'react';
import './comment.scss';
import defaultProfileImg from '../../assets/default-profile.png';
import { AuthContext } from '../../context/auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from '../../common/utils';
import { IComment } from '../../common/interfaces/comment.interface';
import moment from 'moment';
import ConfirmDialog from '../confirm-dialog/confirm-dialog';

export const Comment = ({ comment }: { comment: IComment }) => {
  const queryClient = useQueryClient();
  const { loggedInUser } = useContext(AuthContext);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [likes, setLikes] = useState(comment.likes.length);
  const [commentLiked, setCommentLiked] = useState(
    comment.likes.includes(String(loggedInUser?._id))
  );

  const likeMutation = useMutation(
    (liked: boolean) => {
      if (liked)
        return axiosRequest.patch(
          `/posts/${comment.postId}/comments/${comment._id}/unlike`
        );
      return axiosRequest.patch(
        `/posts/${comment.postId}/comments/${comment._id}/like`
      );
    },
    {
      onSuccess: () => {
        setLikes(commentLiked ? likes - 1 : likes + 1);
        setCommentLiked(!commentLiked);
      },
    }
  );

  const deleteMutation = useMutation(
    () => {
      return axiosRequest.delete(
        `/posts/${comment.postId}/comments/${comment._id}`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', comment.postId]);
      },
    }
  );

  const handleLike = () => {
    likeMutation.mutate(commentLiked);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className="comment">
      <img
        src={
          comment.userId?.profilePic
            ? `${process.env.REACT_APP_API}/users/images/${comment.userId.profilePic}`
            : defaultProfileImg
        }
        alt="user profile"
      ></img>
      <div className="comment__content">
        <span>
          {comment.userId?.firstName + ' ' + comment.userId?.lastName}
        </span>
        <p>{comment.content}</p>
        <div className="comment__actions">
          <span>{likes}</span>
          {commentLiked ? (
            <span
              className="span-button span-button--active"
              onClick={handleLike}
            >
              Liked
            </span>
          ) : (
            <span className="span-button" onClick={handleLike}>
              Like
            </span>
          )}
          {loggedInUser?._id === comment.userId?._id && (
            <>
              <span
                className="span-button"
                onClick={() => setShowConfirmDialog(true)}
              >
                Delete
              </span>
              <ConfirmDialog
                title="Delete Comment"
                open={showConfirmDialog}
                setOpen={setShowConfirmDialog}
                onConfirm={handleDelete}
              >
                Are you sure you want to delete comment?
              </ConfirmDialog>
            </>
          )}
        </div>
      </div>
      <span className="date">{moment(comment.createdAt).fromNow()}</span>
    </div>
  );
};

export default Comment;
