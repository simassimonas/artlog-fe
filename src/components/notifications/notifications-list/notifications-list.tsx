import React, {
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Menu from '@mui/material/Menu';
import { INotification } from '../../../common/interfaces/notification.interface';
import Notification from '../notification/notification';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { axiosRequest } from '../../../common/utils';
import { CircularProgress, MenuItem, useMediaQuery } from '@mui/material';
import { InView } from 'react-intersection-observer';
import './notifications-list.scss';
import { SocketContext } from '../../../context/socket.context';
import { toast } from 'react-toastify';

interface NotificationsListProps {
  anchorEl: HTMLElement | null;
  handleClose: (event: MouseEvent) => void;
  open: boolean;
  limit?: number;
  onUnseenNotificationsCountChange: (count: number) => void;
}

const NotificationsList = ({
  anchorEl,
  handleClose,
  open,
  onUnseenNotificationsCountChange,
  limit = 10,
}: NotificationsListProps) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const queryClient = useQueryClient();
  const { notifications: notificationsSocket } = useContext(SocketContext);
  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);
  const [unseenNotificationsCount, setUnseenNotificationsCount] =
    useState<number>(0);

  const { data: unseenNotificationsCountData } = useQuery({
    queryKey: ['unseenNotificationsCount'],
    queryFn: () =>
      axiosRequest.get('/notifications/unseen-count').then((res) => {
        return res.data;
      }),
    onSuccess: (data) => {
      setUnseenNotificationsCount(data);
    },
  });

  useEffect(() => {
    if (unseenNotificationsCount !== undefined) {
      onUnseenNotificationsCountChange(unseenNotificationsCount);
    }
  }, [unseenNotificationsCount]);

  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['notifications'],
    async ({ pageParam = 0 }) => {
      const res = await axiosRequest.get(
        `/notifications?page=${pageParam}&limit=${limit}`
      );
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
      onSuccess: (data) => {
        markSeenNotifications();
      },
    }
  );

  const observerCallback = (inView: boolean) => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    notificationsSocket?.on('notification', (notification: INotification) => {
      if (!isMobile) {
        toast(<Notification notification={notification} />, {
          containerId: 'layout',
        });
      }

      if (openRef.current) {
        updateNotificationsMutation.mutate([notification._id]);
      } else {
        queryClient.invalidateQueries(['unseenNotificationsCount']);

        setAllNotifications((prevAllNotifications) => [
          notification,
          ...prevAllNotifications,
        ]);
      }
    });

    return () => {
      notificationsSocket?.off('notification');
    };
  }, [notificationsSocket]);

  useEffect(() => {
    if (data) {
      const fetchedNotifications = data.pages.flatMap(
        (pageData) => pageData.notifications
      );
      setAllNotifications(fetchedNotifications);
      markSeenNotifications();
    }
  }, [data]);

  const updateNotifications = async (notificationIds: string[]) => {
    const updatePromises = notificationIds.map((notificationId) =>
      axiosRequest.patch(`/notifications/${notificationId}`, { isSeen: true })
    );
    await Promise.all(updatePromises);
  };

  const updateNotificationsMutation = useMutation(updateNotifications, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['unseenNotificationsCount']);
    },
  });

  const markSeenNotifications = () => {
    const unseenNotificationIds = allNotifications
      .filter((notification) => !notification.isSeen)
      .map((notification) => notification._id);

    if (unseenNotificationIds.length === 0) return;
    updateNotificationsMutation.mutate(unseenNotificationIds);
  };

  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;

    if (open) {
      markSeenNotifications();
    }
  }, [open]);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: '70vh',
          overflowY: 'auto',
          overflowX: 'hidden',
        },
      }}
      sx={{
        '& .MuiMenu-list': {
          paddingTop: 0,
          paddingBottom: 0,
        },
      }}
    >
      <div className="notifications-list">
        {error ? (
          <div className="error-message notifications-list notifications-list--empty">
            <span>Something went wrong!</span>
          </div>
        ) : isLoading ? (
          <CircularProgress />
        ) : allNotifications?.length === 0 ? (
          <div className="notifications-list notifications-list--empty">
            <span>No new notifications</span>
          </div>
        ) : (
          allNotifications.map((notification: INotification) => (
            <MenuItem
              key={notification?._id}
              sx={{
                padding: 0,
              }}
              onClick={handleClose}
            >
              <Notification
                key={notification?._id}
                notification={notification}
              />
            </MenuItem>
          ))
        )}
        {isFetchingNextPage && <CircularProgress />}
        <InView onChange={observerCallback} threshold={1}>
          <div style={{ height: 1 }}></div>
        </InView>
      </div>
    </Menu>
  );
};

export default NotificationsList;
