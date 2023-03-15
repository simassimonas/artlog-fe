import { IUser } from './user.interface';

export interface IComment {
  date: string;
  comment: string;
  user: IUser;
}
