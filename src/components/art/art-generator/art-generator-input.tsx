import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth.context';
import './art-generator-input.scss';
import defaultProfileImg from '../../../assets/default-profile.png';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from '../../../common/utils';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const ArtGeneratorInput = ({ initialValue = '', placeholder }: any) => {
  const queryClient = useQueryClient();
  const { loggedInUser } = useContext(AuthContext);
  const [prompt, setPrompt] = useState('');

  const { data: userData } = useQuery({
    queryKey: ['user', loggedInUser?._id],
    queryFn: () =>
      axiosRequest.get('/users/' + loggedInUser?._id).then((res) => {
        return res.data;
      }),
  });

  const userHasEnoughCredits =
    userData?.credits >= Number(process.env.REACT_APP_AI_ART_GENERATION_COST);

  const newArtMutation = useMutation(
    () => {
      return axiosRequest.post('/art', { prompt });
    },
    {
      onSuccess: () => {
        setPrompt('');
        queryClient.invalidateQueries(['art-list']);
        toast.success('Art was generated successfully', {
          autoClose: 5000,
          containerId: 'global',
        });
      },
      onError: (error) => {
        toast.error('Failed to generate art. Please try again later', {
          autoClose: 5000,
          containerId: 'global',
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(['user', loggedInUser?._id]);
      },
    }
  );

  const handleArtGeneration = () => {
    newArtMutation.mutate();
  };

  return (
    <div className="art-generator-input">
      <div className="top">
        {newArtMutation.isLoading ? (
          <CircularProgress />
        ) : (
          <div className="left">
            <img
              src={
                loggedInUser?.profilePic
                  ? `${process.env.REACT_APP_API}/users/images/${loggedInUser?.profilePic}`
                  : defaultProfileImg
              }
              alt="user profile"
            />

            <textarea
              cols={6}
              rows={5}
              placeholder={placeholder}
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
            />
          </div>
        )}
      </div>
      <hr />
      <div className="bottom">
        <div className="left">
          <div className="tries">
            Credits: {userData?.credits} (max{' '}
            {process.env.REACT_APP_USER_MAX_FREE_CREDITS})
          </div>
          <div className="info">
            You get {process.env.REACT_APP_USER_DAILY_FREE_CREDITS} free credits
            everyday!
          </div>
        </div>
        <div className="right">
          <button
            className="action-button"
            onClick={handleArtGeneration}
            disabled={
              newArtMutation.isLoading ||
              prompt.length == 0 ||
              !userHasEnoughCredits
            }
          >
            Generate
          </button>
          <div className="info">
            {process.env.REACT_APP_AI_ART_GENERATION_COST} credit
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtGeneratorInput;
