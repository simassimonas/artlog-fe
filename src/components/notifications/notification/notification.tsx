import React, { useContext, useState } from 'react';
import './notification.scss';
import { Link } from 'react-router-dom';
import defaultProfileImg from '../../../assets/default-profile.png';
import { axiosRequest } from '../../../common/utils';
import { INotification } from '../../../common/interfaces/notification.interface';
import { useQueryClient } from '@tanstack/react-query';
import { ENotificationType } from '../../../common/enums/notification-type.enum';
import moment from 'moment';

const typeToActionMap = {
  [ENotificationType.LIKE]: 'liked',
  [ENotificationType.COMMENT]: 'commented',
};

export const Notification = ({
  notification,
}: {
  notification: INotification;
}) => {
  const initiatorName =
    notification?.initiatorId?.firstName +
    ' ' +
    notification?.initiatorId?.lastName;

  const action = typeToActionMap[notification?.type];
  const subject =
    notification?.type === ENotificationType.COMMENT
      ? 'on your post'
      : 'your post';

  return (
    <Link
      className={`notification${
        notification?.isSeen ? '' : ' notification--active'
      }`}
      to={`posts/${notification?.refId}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="notification__initiator-image">
        <img
          src={
            notification?.initiatorId?.profilePic
              ? `${process.env.REACT_APP_API}/users/images/${notification?.initiatorId?.profilePic}`
              : defaultProfileImg
          }
          alt="profile"
        />
      </div>
      <div className="notification__info">
        <div className="notification__initiator-info">
          <span className="notification__user-name">{initiatorName}</span>
          <span className="notification__user-username">
            {'@' + notification?.initiatorId?.username}
          </span>
        </div>
        <div className="notification__describtion">
          <span className="notification__action">{action}</span> {subject}
          <span className="notification__user-username">
            {' '}
            {moment(notification?.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Notification;

// const typeToActionMap = {
//   [ENotificationType.LIKE]: 'liked',
//   [ENotificationType.COMMENT]: 'commented',
// };

// export const Notification = ({
//   notification,
// }: {
//   notification: INotification;
// }) => {
//   const navigate = useNavigate();
//   const initiatorName =
//     notification?.initiatorId?.firstName +
//     ' ' +
//     notification?.initiatorId?.lastName;

//   const action = typeToActionMap[notification?.type];
//   const subject =
//     notification?.type === ENotificationType.COMMENT
//       ? 'on your post'
//       : 'your post';

//   const handleClick = () => {
//     navigate(`posts/${notification?.refId}`);
//   };

//   return (
//     <div
//       className={`notification${
//         notification?.isSeen ? '' : ' notification--active'
//       }`}
//       onClick={handleClick}
//       style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
//     >
//       <div className="notification__initiator-image">
//         <img
//           src={
//             notification?.initiatorId?.profilePic
//               ? `${process.env.REACT_APP_API}/users/images/${notification?.initiatorId?.profilePic}`
//               : defaultProfileImg
//           }
//           alt="profile"
//         />
//       </div>
//       <div className="notification__info">
//         <div className="notification__initiator-info">
//           <span className="notification__user-name">{initiatorName}</span>
//           <span className="notification__user-username">
//             {'@' + notification?.initiatorId?.username}
//           </span>
//         </div>
//         <div className="notification__describtion">
//           <span className="notification__action">{action}</span> {subject}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notification;

// const typeToActionMap = {
//   [ENotificationType.LIKE]: 'liked',
//   [ENotificationType.COMMENT]: 'commented',
// };

// export const Notification = ({
//   notification,
// }: {
//   notification: INotification;
// }) => {
//   const initiatorName =
//     notification?.initiatorId?.firstName +
//     ' ' +
//     notification?.initiatorId?.lastName;

//   const action = typeToActionMap[notification?.type];
//   const subject =
//     notification?.type === ENotificationType.COMMENT
//       ? 'on your post'
//       : 'your post';

//   return (
//     <Link
//       className={`notification${
//         notification?.isSeen ? '' : ' notification--active'
//       }`}
//       to={`posts/${notification?.refId}`}
//       style={{ textDecoration: 'none', color: 'inherit' }}
//     >
//       <div className="notification__initiator-image">
//         <img
//           src={
//             notification?.initiatorId?.profilePic
//               ? `${process.env.REACT_APP_API}/users/images/${notification?.initiatorId?.profilePic}`
//               : defaultProfileImg
//           }
//           alt="profile"
//         />
//       </div>
//       <div className="notification__info">
//         <div className="notification__initiator-info">
//           <span className="notification__user-name">{initiatorName}</span>
//           <span className="notification__user-username">
//             {'@' + notification?.initiatorId?.username}
//           </span>
//         </div>
//         <div className="notification__describtion">
//           <span className="notification__action">{action}</span> {subject}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Notification;
