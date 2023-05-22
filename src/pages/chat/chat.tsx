import { useState } from 'react';
import './chat.scss';
import Conversations from '../../components/chat/conversations/conversations';
import ChatBox from '../../components/chat/chatbox/chatbox';
import { IUser } from '../../common/interfaces/user.interface';

const Chat = ({ initialValue = '', placeholder }: any) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleSelectUser = (user: IUser) => {
    setSelectedUser(user);
  };

  return (
    <div className="chat">
      <div className="chat__conversations">
        <Conversations onSelectUser={handleSelectUser} />
      </div>
      <div className="chat__chatbox">
        <ChatBox user={selectedUser} />
      </div>
    </div>
  );
};

export default Chat;
