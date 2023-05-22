import './profile-pic.scss';
import { axiosRequest } from '../../../common/utils';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../context/auth.context';
import { useContext, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import defaultProfileImg from '../../../assets/default-profile.png';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from 'react-toastify';

const ProfilePic = () => {
  const { loggedInUser, fetchLoggedInUserInfo } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModified, setIsModified] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      axiosRequest.get('/users/' + loggedInUser?._id).then((res) => {
        return res.data;
      }),
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
      setIsModified(true);
    }
  };

  const handleSavePhoto = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('profilePic', selectedFile);

    try {
      await axiosRequest.post('/users/profile-pic/', formData);
      fetchLoggedInUserInfo(loggedInUser!._id);
      toast.success('Profile picture updated successfully', {
        autoClose: 5000,
        containerId: 'global',
      });
    } catch (error: any) {
      let errorMessage = 'Something went wrong. Try again later';
      if (error.response.status == 422)
        errorMessage =
          'Incorrect image format (jpg, jpeg, png) or size too large';

      toast.error(errorMessage, { autoClose: 5000, containerId: 'global' });
    }
  };

  return (
    <div className="profile-pic">
      {error ? (
        <div className="error-message">Something went wrong!</div>
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="profile-pic__image">
            <img
              src={
                previewUrl
                  ? previewUrl
                  : data?.profilePic
                  ? `${process.env.REACT_APP_API}/users/images/${data?.profilePic}`
                  : defaultProfileImg
              }
            />
          </div>
          <div className="profile-pic__actions">
            <label className="action-button icon-text-button">
              <AddPhotoAlternateIcon />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoUpload}
              />
              Upload new
            </label>
            <button
              onClick={handleSavePhoto}
              disabled={!isModified}
              className="action-button icon-text-button"
            >
              <CheckCircleIcon />
              Save Photo
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePic;
