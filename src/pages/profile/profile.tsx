import './profile.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import MessageIcon from '@mui/icons-material/Message';
import Posts from '../../components/posts/posts';
import defaultProfileImg from '../../assets/default-profile.png';
import { axiosRequest } from '../../common/utils';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useContext, useState } from 'react';
import FiendshipButton from '../../components/friendship-button/friendship-button';
import CircularProgress from '@mui/material/CircularProgress';
import { EFriendshipStatus } from '../../common/enums/friendship-status.enum';
import LockIcon from '@mui/icons-material/Lock';

const Profile = () => {
  const { loggedInUser } = useContext(AuthContext);
  const profileId: string | undefined = useParams().id;
  const isOwnProfile: boolean = loggedInUser?._id === profileId;
  const [friendshipStatus, setFriendshipStatus] =
    useState<EFriendshipStatus | null>(null);

  const handleFriendshipStatusChange = (status: EFriendshipStatus) => {
    setFriendshipStatus(status);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['user', profileId],
    queryFn: () =>
      axiosRequest.get('/users/' + profileId).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="profile">
      {error ? (
        <div>Something went wrong</div>
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="profile__image">
            <img
              src={
                data?.profilePic
                  ? `${process.env.REACT_APP_API}/users/images/${data?.profilePic}`
                  : defaultProfileImg
              }
              className="profile__pic"
            />
          </div>
          <div className="profile__info">
            <div className="profile__info-items">
              <div className="profile__names">
                <h1 className="profile__name">
                  {data?.firstName + ' ' + data?.lastName}
                </h1>
                <span className="profile__username">
                  {'@' + data?.username}
                </span>
              </div>
              <div className="profile__actions">
                {data?.isPrivate &&
                  friendshipStatus !== EFriendshipStatus.ACCEPTED && (
                    <LockIcon color="primary" />
                  )}

                <FiendshipButton
                  onStatusChange={handleFriendshipStatusChange}
                  profileId={profileId || ''}
                />

                <Link to={`/chat/${profileId}`}>
                  <button className="action-button icon-text-button">
                    <MessageIcon />
                    Message
                  </button>
                </Link>

                {isOwnProfile && (
                  <Link to="/settings">
                    <button className="action-button icon-text-button">
                      <SettingsIcon />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <Posts endpointName="profile" profileId={profileId} />
        </>
      )}
    </div>
  );
};

export default Profile;
