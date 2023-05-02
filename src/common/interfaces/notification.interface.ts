import { ENotificationType } from '../enums/notification-type.enum';
import { IUser } from './user.interface';

export interface INotification {
  _id: string;
  initiatorId: IUser;
  receiverId: IUser;
  isSeen: boolean;
  refId: string;
  refType: string;
  type: ENotificationType;
  createdAt: string;
}
