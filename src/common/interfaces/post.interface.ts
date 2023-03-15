import { IUser } from './user.interface';

export interface IPost {
  id: string;
  img: string;
  user: IUser;
}
