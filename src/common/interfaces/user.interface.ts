export interface IUser {
  _id: string;
  username: string;
  name?: string;
  profilePic: string;
  email: string;
  firstName: string;
  lastName: string;
  isPrivate: boolean | undefined;
}
