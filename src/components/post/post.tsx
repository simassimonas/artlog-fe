import React, { useState } from 'react';
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

export const Post = ({ post }: { post: IPost }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const liked = true;

  return (
    <div className="post">
      <div className="post__user">
        <div className="post__profile">
          <Link
            className="post__user-link"
            to={`/profile/${post.user.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img
              className="post__profile-img"
              src={post.user.profile_pic}
              alt="post's author"
            />
          </Link>
          <div className="post__user-details">
            <Link
              className="post__user-link"
              to={`/profile/${post.user.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <span className="post__user-name">{post.user.name}</span>
            </Link>
            <span className="post__user-date">1 min ago</span>
          </div>
        </div>
        <MoreHorizIcon className="post__menu-icon" />
      </div>
      <div className="post__content">
        <img src={post.img} alt="post" />
      </div>
      <div className="post__feedback">
        <div className="post__feedback-item">
          {liked ? (
            <FavoriteOutlinedIcon color="error" />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
          12 Likes
        </div>
        <div
          className="post__feedback-item"
          onClick={() => setCommentOpen(!commentOpen)}
        >
          <TextsmsOutlinedIcon />
          12 Comments
        </div>
        <div className="post__feedback-item">
          <ShareOutlinedIcon />
          Share
        </div>
      </div>
      {commentOpen && <Comments />}
    </div>
  );
};

export default Post;
