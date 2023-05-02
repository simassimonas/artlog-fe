import React, { useContext, useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Menu, MenuItem } from '@mui/material';
import NotificationsList from '../notifications-list/notifications-list';
import { SocketContext } from '../../../context/socket.context';
import { INotification } from '../../../common/interfaces/notification.interface';

const NotificationBell = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [unseenNotificationsCount, setUnseenNotificationsCount] =
    useState<number>(0);

  const handleUnseenCountChange = (count: number) => {
    setUnseenNotificationsCount(count);
  };

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div>
      <IconButton onClick={handleToggle}>
        <Badge badgeContent={unseenNotificationsCount} color="error" max={999}>
          <NotificationsIcon color="secondary" />
        </Badge>
      </IconButton>

      <NotificationsList
        open={open}
        anchorEl={anchorEl}
        handleClose={handleToggle}
        onUnseenNotificationsCountChange={handleUnseenCountChange}
      />
    </div>
  );
};

export default NotificationBell;
