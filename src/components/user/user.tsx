import React, { useContext, useState } from 'react';
import './user.scss';
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

export const User = ({ user }: { user: IUser }) => {
  return (
    <Link
      className="user"
      to={`/profile/${user._id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="user__image">
        <img
          className="user__profile-img"
          src={
            user?.profilePic
              ? `${process.env.REACT_APP_API}/users/images/${user?.profilePic}`
              : defaultProfileImg
          }
          alt="profile"
        />
      </div>
      <div className="user__info">
        <div className="post__user-names">
          <span className="post__user-name">
            {user.firstName + ' ' + user.lastName}
          </span>
          <span className="post__user-username">{'@' + user.username}</span>
        </div>
      </div>
    </Link>
  );
};

export default User;
