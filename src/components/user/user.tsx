import React, { useContext, useState } from 'react';
import './user.scss';
import { IUser } from '../../common/interfaces/user.interface';
import { Link } from 'react-router-dom';
import defaultProfileImg from '../../assets/default-profile.png';

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
        <div className="user__names">
          <span className="user__name">
            {user.firstName + ' ' + user.lastName}
          </span>
          <span className="user__username">{'@' + user.username}</span>
        </div>
      </div>
    </Link>
  );
};

export default User;
