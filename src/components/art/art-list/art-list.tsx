import axios from 'axios';
import { useEffect, useState } from 'react';
import './art-list.scss';
import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosRequest } from '../../../common/utils';
import { InView } from 'react-intersection-observer';
import { Box, CircularProgress, IconButton, Modal } from '@mui/material';
import Art from '../art/art';
import { IArt } from '../../../common/interfaces/art.interface';
import ArtToPost from '../art-to-post/art-to-post';

const ArtList = ({ limit = 10 }) => {
  const [allArt, setAllArt] = useState<IArt[]>([]);
  const [selectedArt, setSelectedArt] = useState<IArt | null>(null);

  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['art-list'],
    async ({ pageParam = 0 }) => {
      const res = await axiosRequest.get(
        `/art?page=${pageParam}&limit=${limit}`
      );
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  useEffect(() => {
    if (data) {
      const art = data.pages.flatMap((pageData) => pageData.art);
      setAllArt(art);
    }
  }, [data]);

  const observerCallback = (inView: boolean) => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="art-list">
      {error ? (
        <div className="error-message">Something went wrong!</div>
      ) : isLoading ? (
        <CircularProgress />
      ) : allArt?.length === 0 ? (
        'No users found'
      ) : (
        <div className="art-list__content">
          {allArt?.map((art: any) => (
            <div
              key={art?._id}
              onClick={() => setSelectedArt(art)}
              className="art-list__content-item"
            >
              <Art key={art?._id} art={art}></Art>
            </div>
          ))}
        </div>
      )}
      {isFetchingNextPage && <CircularProgress />}

      {selectedArt && (
        <Modal
          open={Boolean(selectedArt)}
          onClose={() => setSelectedArt(null)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxHeight: '90vh',
              overflow: 'auto',
              width: '30%',
              '@media (max-width: 600px)': {
                width: '90%',
              },
              bgcolor: 'background.paper',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArtToPost
              art={selectedArt}
              closeModal={() => setSelectedArt(null)}
            />
          </Box>
        </Modal>
      )}
      <InView onChange={observerCallback} threshold={1}>
        <div style={{ height: 1 }}></div>
      </InView>
    </div>
  );
};

export default ArtList;
