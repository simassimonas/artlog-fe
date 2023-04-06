import { IArt } from './art.interface';
import { IUser } from './user.interface';

export interface IPost {
  id: string;
  img: string;
  userId: IUser;
  artId: IArt;
}
