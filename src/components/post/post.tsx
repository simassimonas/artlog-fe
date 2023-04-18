import React, { useContext, useState } from 'react';
import './post.scss';
import { IUser } from '../../common/interfaces/user.interface';
import { IPost } from '../../common/interfaces/post.interface';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import Comments from '../comments/comments';
import defaultProfileImg from '../../assets/default-profile.png';
import { AuthContext } from '../../context/auth.context';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from '../../common/utils';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';

export const Post = ({ post }: { post: IPost }) => {
  const queryClient = useQueryClient();
  const { loggedInUser } = useContext(AuthContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [postLiked, setPostLiked] = useState(
    post.likes.includes(String(loggedInUser?._id))
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: comments } = useQuery(['comments', post._id], () =>
    axiosRequest.get(`/posts/${post._id}/comments`).then((res) => {
      return res.data;
    })
  );

  const likeMutation = useMutation(
    (liked: boolean) => {
      if (liked) return axiosRequest.patch(`/posts/${post._id}/unlike`);
      return axiosRequest.patch(`/posts/${post._id}/like`);
    },
    {
      onSuccess: () => {
        setLikes(postLiked ? likes - 1 : likes + 1);
        setPostLiked(!postLiked);
      },
    }
  );

  const postDeleteMutation = useMutation(
    () => {
      return axiosRequest.delete(`/posts/${post._id}`);
    },
    {
      onSuccess: () => {
        toast.success('Post was deleted successfully', { autoClose: 5000 });
        queryClient.invalidateQueries(['posts']);
      },
    }
  );

  const handleLike = () => {
    likeMutation.mutate(postLiked);
  };

  const handlePostDelete = () => {
    handleClose();
    postDeleteMutation.mutate();
  };

  return (
    <div className="post">
      <div className="post__user">
        <div className="post__profile">
          <Link
            className="post__user-link"
            to={`/profile/${post.userId._id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img
              className="post__profile-img"
              src={
                post?.userId?.profilePic
                  ? `${process.env.REACT_APP_API}/users/images/${post.userId?.profilePic}`
                  : defaultProfileImg
              }
              alt="post's author"
            />
          </Link>
          <div className="post__user-details">
            <Link
              className="post__user-link"
              to={`/profile/${post.userId._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="post__user-names">
                <span className="post__user-name">
                  {post.userId.firstName + ' ' + post.userId.lastName}
                </span>
                <span className="post__user-username">
                  {'@' + post.userId.username}
                </span>
              </div>
            </Link>
            <span className="post__user-date">{post.createdAt.toString()}</span>
          </div>
        </div>
        {/* <MoreHorizIcon className="post__menu-icon" /> */}
        <div>
          <IconButton
            id="basic-button"
            className="more-options-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon className="post__menu-icon" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              disabled={loggedInUser?._id !== post.userId?._id}
              onClick={handlePostDelete}
            >
              Delete post
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className="post__content">
        <img
          src={`${process.env.REACT_APP_API}/art/images/${post.artId.name}`}
          alt="post"
        />
      </div>
      <div className="post__feedback">
        <div className="post__feedback-item">
          {postLiked ? (
            <FavoriteOutlinedIcon
              style={{ color: 'red' }}
              onClick={handleLike}
            />
          ) : (
            <FavoriteBorderOutlinedIcon onClick={handleLike} />
          )}
          {likes} Likes
        </div>
        <div
          className="post__feedback-item"
          onClick={() => setCommentOpen(!commentOpen)}
        >
          <TextsmsOutlinedIcon />
          {comments?.length} Comments
        </div>
      </div>
      {commentOpen && <Comments postId={post._id} />}
    </div>
  );
};

export default Post;
