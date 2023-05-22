import './post-page.scss';
import { useQuery } from '@tanstack/react-query';
import { axiosRequest } from '../../common/utils';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import Post from '../../components/post/post';

export const PostPage = () => {
  const postId: string | undefined = useParams().id;

  const {
    isLoading,
    error,
    data: post,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () =>
      axiosRequest.get('/posts/' + postId).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="post-page">
      {error ? (
        <div className="error-message">Something went wrong!</div>
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <Post key={post?._id} post={post}></Post>
      )}
    </div>
  );
};

export default PostPage;
