export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  image?: string | object | null;
}
