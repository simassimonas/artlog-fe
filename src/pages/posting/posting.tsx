import { useContext } from 'react';
import ArtGeneratorInput from '../../components/art/art-generator/art-generator-input';
import { AuthContext } from '../../context/auth.context';
import './posting.scss';
import ArtList from '../../components/art/art-list/art-list';
import { useQuery } from '@tanstack/react-query';
import { axiosRequest } from '../../common/utils';
import InfoIcon from '@mui/icons-material/Info';

const Posting = () => {
  const { loggedInUser } = useContext(AuthContext);

  // multiply by -1 to invert the sign since getTimezoneOffset() return value will be negative if ure ahead of UTC and vice versa
  const timezoneOffset = new Date().getTimezoneOffset() * -1;
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts', 'status'],
    queryFn: () =>
      axiosRequest
        .get(`/posts/status?timezone=${timezoneOffset}`)
        .then((res) => {
          return res.data;
        }),
  });

  const canPost = !isLoading && !error && data && data.canPost;

  return (
    <div className="posting">
      <ArtGeneratorInput placeholder="Enter a prompt describing your day" />
      <div className="posting__art">
        <div className="posting__art-header">
          <h1>Generated art:</h1>
          <div className="posting__post-info">
            {' '}
            <div className="posting__post-info">
              <InfoIcon fontSize="small" />
              {!isLoading && !canPost
                ? data.timezoneChanged
                  ? `We noticed your timezone changed! Please wait ${data.timeUntilPost} hours before posting again.`
                  : `You already posted today. You can post again in ${data?.timeUntilPost} hours`
                : `You can use the following art to make a post`}
            </div>
          </div>
        </div>
        <ArtList />
      </div>
    </div>
  );
};

export default Posting;
