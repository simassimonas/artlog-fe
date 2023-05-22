import { useContext, useEffect, useRef, useState } from 'react';
import './chatbox.scss';
import Message from '../message/message';
import { CircularProgress, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { IUser } from '../../../common/interfaces/user.interface';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { axiosRequest } from '../../../common/utils';
import { IMessage } from '../../../common/interfaces/message.interface';
import { AuthContext } from '../../../context/auth.context';
import { SocketContext } from '../../../context/socket.context';
import { InView } from 'react-intersection-observer';

const ChatBox = ({ user }: { user: IUser | null }) => {
  const queryClient = useQueryClient();
  const { loggedInUser } = useContext(AuthContext);
  const { messages: messagesSocket } = useContext(SocketContext);
  const [newMessage, setNewMessage] = useState('');
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [shouldScrollToTheBottom, setShouldScrollToTheBottom] = useState(false);
  const [queryUser, setQueryUser] = useState(user);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const limit = 10;

  useEffect(() => {
    setNewMessage('');
    setAllMessages([]);
    setShouldScrollToTheBottom(false);
    queryClient.removeQueries(['messages', user]);
    fetchNextPage();
    setQueryUser(user);
  }, [user]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['messages', queryUser],
      async ({ pageParam = null }) => {
        const res = await axiosRequest.get(
          `/messages/conversations/${user?._id}?lastMessageId=${pageParam}&limit=${limit}`
        );
        return res.data;
      },
      {
        getNextPageParam: (lastPage) =>
          lastPage.messages[lastPage.messages.length - 1]?._id,
      }
    );

  useEffect(() => {
    messagesSocket?.on('message', (message: IMessage) => {
      if (message.from._id == user?._id) {
        setAllMessages((prevAllMessages) => [...prevAllMessages, message]);
        setShouldScrollToTheBottom(true);
      }
    });

    return () => {
      messagesSocket?.off('message');
    };
  }, [messagesSocket, user]);

  useEffect(() => {
    if (data) {
      const lastFetchedPage = data.pages[data.pages.length - 1];
      const newMessages = [...lastFetchedPage.messages].reverse();
      setAllMessages((prevMessages) => [...newMessages, ...prevMessages]);
    }
  }, [data]);

  const newMessageMutation = useMutation(
    (message: string) => {
      const body = {
        to: user?._id,
        content: message,
      };
      return axiosRequest.post('/messages', body);
    },
    {
      onSuccess: (message) => {
        setAllMessages((prevAllMessages) => [...prevAllMessages, message.data]);
        setShouldScrollToTheBottom(true);
      },
    }
  );

  const keyPress = (e: any) => {
    if (e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleMessageMutation();
    }
  };

  const handleMessageMutation = () => {
    newMessageMutation.mutate(newMessage);
    setNewMessage('');
  };

  const observerCallback = (inView: boolean) => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (shouldScrollToTheBottom) {
      scrollToTheBottom();
      setShouldScrollToTheBottom(false);
    }
  }, [allMessages, shouldScrollToTheBottom]);

  const scrollToTheBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chatbox">
      <div className="chatbox__info">
        <div className="chatbox__info-names">
          <span className="chatbox__info-name">
            {user?.firstName + ' ' + user?.lastName}
          </span>
          <span className="chatbox__info-username">{'@' + user?.username}</span>
        </div>
      </div>
      <div className="chatbox__top">
        <InView onChange={observerCallback} threshold={1}>
          <div style={{ height: 1 }}></div>
        </InView>
        {isFetchingNextPage && <CircularProgress />}
        {allMessages.map((m, index) => (
          <div
            className="chatbox__message-wrapper"
            key={m._id}
            ref={index === allMessages.length - 1 ? scrollRef : null}
          >
            <Message
              key={m._id}
              message={m}
              own={m?.from?._id === loggedInUser?._id}
            />
          </div>
        ))}
      </div>
      <div className="chatbox__bottom">
        <TextField
          multiline
          maxRows={4}
          fullWidth
          color="secondary"
          size="small"
          onKeyDown={keyPress}
          placeholder="Type a message..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          inputProps={{
            style: {
              padding: 0,
              fontSize: 14,
            },
          }}
        />
        <IconButton color="primary" onClick={handleMessageMutation}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatBox;
