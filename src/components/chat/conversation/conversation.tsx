import React from 'react';
import './conversation.scss';
import { IUser } from '../../../common/interfaces/user.interface';
import defaultProfileImg from '../../../assets/default-profile.png';

const Conversation = ({ user }: { user: IUser }) => {
  return (
    <div className="conversation">
      <div className="conversation__image">
        <img
          className="conversation__profile-img"
          src={
            user?.profilePic
              ? `${process.env.REACT_APP_API}/users/images/${user?.profilePic}`
              : defaultProfileImg
          }
          alt="profile"
        />
      </div>
      <div className="conversation__user-info">
        <div className="conversation__user-names">
          <span className="conversation__user-name">
            {user.firstName + ' ' + user.lastName}
          </span>
          <span className="conversation__user-username">
            {'@' + user.username}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
