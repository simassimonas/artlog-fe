import { useState } from 'react';
import './art-to-post.scss';
import { WithContext as ReactTags } from 'react-tag-input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from '../../../common/utils';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

export interface Tag {
  id: string;
  text: string;
}

const ArtToPost = ({ art, closeModal }: any) => {
  const queryClient = useQueryClient();
  const [tags, setTags] = useState<Tag[]>([]);

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

  const handleTagAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const handleTagDelete = (i: Number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const newPostMutation = useMutation(
    () => {
      const tagsValues = tags.map((tag) => tag.text);
      const body = {
        artId: art._id,
        timezone: timezoneOffset.toString(),
        tags: tagsValues,
      };
      return axiosRequest.post('/posts', body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts', 'status']);
        toast.success('Post was successful', {
          autoClose: 5000,
          containerId: 'global',
        });
        closeModal();
      },
      onError: (error) => {
        queryClient.invalidateQueries(['posts', 'status']);
        toast.error('Failed to post. Please try again later', {
          autoClose: 5000,
          containerId: 'global',
        });
      },
    }
  );

  const handlePost = () => {
    newPostMutation.mutate();
  };

  return (
    <div className="art-to-post">
      <div className="art-to-post__prompt">
        <span>{art.prompt}</span>
      </div>
      <div className="art-to-post__content">
        {newPostMutation.isLoading ? (
          <CircularProgress />
        ) : (
          <img
            src={`${process.env.REACT_APP_API}/art/images/${art?.name}`}
            alt="art"
          />
        )}
      </div>
      <div className="art-to-post__tags">
        <ReactTags
          tags={tags}
          handleDelete={handleTagDelete}
          handleAddition={handleTagAddition}
          placeholder="Add tags"
          maxLength={Number(process.env.REACT_APP_TAGS_MAX_LENGTH)}
          inputProps={{
            disabled: !canPost,
          }}
        />
      </div>
      <div className="art-to-post__action">
        <button
          className="action-button"
          onClick={handlePost}
          disabled={!canPost || newPostMutation.isLoading}
        >
          Post this
        </button>
        {error ? (
          <div className="error-message">Something went wrong!</div>
        ) : !isLoading && !canPost ? (
          <div className="art-to-post__message">
            {data && data.timezoneChanged
              ? `We noticed your timezone changed! Please wait ${data.timeUntilPost} hours before posting again.`
              : `You already posted today. You can post again in ${data?.timeUntilPost} hours`}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ArtToPost;
