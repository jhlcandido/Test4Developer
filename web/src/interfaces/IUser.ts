export interface IUser {
  id?: number;
  _id?: string;
  name: string;
  email: string;
  password: string;
  image?: string | object | null;
}
