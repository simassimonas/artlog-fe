import React from 'react';
import './message.scss';
import moment from 'moment';
import { IMessage } from '../../../common/interfaces/message.interface';
import defaultProfileImg from '../../../assets/default-profile.png';

const Message = ({ message, own }: { message: IMessage; own: boolean }) => {
  return (
    <div className={own ? 'message message--own' : 'message'}>
      <div className="message__body">
        {!own && (
          <img
            className="message__img"
            src={
              message?.from?.profilePic
                ? `${process.env.REACT_APP_API}/users/images/${message?.from?.profilePic}`
                : defaultProfileImg
            }
            alt="profile"
          />
        )}
        <div className="message__content">
          <div className="message__text">{message?.content}</div>
          <div className="message__date">
            {moment(message?.createdAt).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
