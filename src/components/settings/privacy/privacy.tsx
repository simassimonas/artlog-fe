import './privacy.scss';
import { axiosRequest } from '../../../common/utils';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/auth.context';
import { useContext, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import defaultProfileImg from '../../../assets/default-profile.png';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Switch } from '@mui/material';
import { toast } from 'react-toastify';

const Privacy = () => {
  const { loggedInUser, fetchLoggedInUserInfo } = useContext(AuthContext);
  const [isPrivate, setIsPrivate] = useState(loggedInUser?.isPrivate || false);
  const [isModified, setIsModified] = useState(false);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(event.target.checked);
    setIsModified(true);
  };

  const handleSave = async () => {
    try {
      await axiosRequest.patch('/users', {
        isPrivate,
      });
      fetchLoggedInUserInfo(loggedInUser!._id);
      const successMessage = `Your account was successfully set to ${
        isPrivate ? 'private' : 'public'
      }`;
      toast.success(successMessage, {
        autoClose: 5000,
        containerId: 'global',
      });
      setIsModified(false);
    } catch (error: any) {
      toast.error('Something went wrong. Try again later', {
        autoClose: 5000,
        containerId: 'global',
      });
    }
  };

  return (
    <div className="privacy">
      <FormControlLabel
        control={
          <Switch
            checked={isPrivate}
            onChange={handleSwitchChange}
            color="primary"
          />
        }
        labelPlacement="start"
        label="Private Account"
      />
      <button
        className="action-button"
        onClick={handleSave}
        disabled={!isModified}
      >
        Save
      </button>
    </div>
  );
};

export default Privacy;
