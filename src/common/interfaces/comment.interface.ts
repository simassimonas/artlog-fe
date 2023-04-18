import { IUser } from './user.interface';

export interface IComment {
  _id: string;
  postId: string;
  userId: IUser;
  createdAt: string;
  content: string;
  likes: string[];
}
