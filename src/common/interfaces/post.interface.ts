import { IArt } from './art.interface';
import { IUser } from './user.interface';

export interface IPost {
  _id: string;
  userId: IUser;
  artId: IArt;
  timezone: string;
  createdAt: string;
  likes: string[];
  tags: string[];
}
