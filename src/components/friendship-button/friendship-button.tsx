import './friendship-button.scss';
import { AuthContext } from '../../context/auth.context';
import { useContext, useState, useEffect } from 'react';
import { IUser } from '../../common/interfaces/user.interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from '../../common/utils';
import { EFriendshipResponse } from '../../common/enums/friendship-response.enum';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { EFriendshipStatus } from '../../common/enums/friendship-status.enum';

interface FriendshipButtonProps {
  profileId: string;
}

const FiendshipButton = ({
  profileId,
}: FriendshipButtonProps): React.ReactElement | null => {
  const { loggedInUser } = useContext(AuthContext);
  const isOwnProfile = loggedInUser?._id === profileId;
  const [isFriendshipSender, setIsSender] = useState(false);
  const queryClient = useQueryClient();
  const [isLoadingState, setIsLoadingState] = useState(false);

  const { data: friendshipStatus, isFetching } = useQuery(
    ['friendshipStatus', profileId],
    () =>
      axiosRequest.get(`/friendships/status/${profileId}`).then((res) => {
        return res.data;
      }),
    { enabled: !isOwnProfile }
  );

  const sendFriendRequest = useMutation(
    () =>
      axiosRequest.post(`/friendships/request/${profileId}`).then((res) => {
        return res.data;
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['friendshipStatus', profileId]);
      },
    }
  );

  const respondToFriendRequest = useMutation(
    (response: string) =>
      axiosRequest.patch(`/friendships/response/${friendshipStatus?._id}`, {
        response,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['friendshipStatus', profileId]);
      },
    }
  );

  const removeFriendRequest = useMutation(
    () => axiosRequest.delete(`/friendships/${friendshipStatus?._id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['friendshipStatus', profileId]);
      },
    }
  );

  useEffect(() => {
    setIsSender(loggedInUser?._id === friendshipStatus?.senderId?._id);
  }, [friendshipStatus]);

  useEffect(() => {
    const isLoading =
      isFetching ||
      respondToFriendRequest.isLoading ||
      removeFriendRequest.isLoading;
    setIsLoadingState(isLoading);
  }, [
    isFetching,
    respondToFriendRequest.isLoading,
    removeFriendRequest.isLoading,
  ]);

  if (isOwnProfile) return null;

  const handleAddFriend = async () => {
    console.log('handleadddfriend');
    await sendFriendRequest.mutate();
  };

  const handleCancelRequest = async () => {
    await respondToFriendRequest.mutate(EFriendshipResponse.CANCEL);
  };

  const handleAcceptRequest = async () => {
    await respondToFriendRequest.mutate(EFriendshipResponse.ACCEPT);
  };

  const handleDeclineRequest = async () => {
    await respondToFriendRequest.mutate(EFriendshipResponse.DECLINE);
  };

  const handleRemoveFriend = async () => {
    removeFriendRequest.mutate();
  };

  if (!friendshipStatus) {
    return (
      <button
        className="action-button icon-text-button"
        onClick={handleAddFriend}
        disabled={isLoadingState}
      >
        <PersonAddAlt1Icon />
        Add friend
      </button>
    );
  }

  if (
    friendshipStatus.status === EFriendshipStatus.PENDING &&
    isFriendshipSender
  ) {
    return (
      <button
        className="action-button icon-text-button"
        onClick={handleCancelRequest}
        disabled={isLoadingState}
      >
        <ClearIcon />
        Cancel request
      </button>
    );
  }

  if (
    friendshipStatus.status === EFriendshipStatus.PENDING &&
    !isFriendshipSender
  ) {
    return (
      <div className="friendship__response">
        <button
          className="action-button icon-text-button"
          onClick={handleAcceptRequest}
          disabled={isLoadingState}
        >
          <PersonAddAlt1Icon />
          Accept
        </button>
        <button
          className="action-button action-button--dark icon-text-button"
          onClick={handleDeclineRequest}
          disabled={isLoadingState}
        >
          <PersonRemoveIcon />
          Decline
        </button>
      </div>
    );
  }

  if (friendshipStatus.status === EFriendshipStatus.ACCEPTED) {
    return (
      <button
        className="action-button icon-text-button"
        onClick={handleRemoveFriend}
        disabled={isLoadingState}
      >
        <PersonRemoveIcon />
        Remove friend
      </button>
    );
  }

  return null;
};

export default FiendshipButton;
