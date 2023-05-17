import { IUser } from './user.interface';

export interface IMessage {
  _id: string;
  from: IUser;
  to: IUser;
  content: string;
  createdAt: string;
}
