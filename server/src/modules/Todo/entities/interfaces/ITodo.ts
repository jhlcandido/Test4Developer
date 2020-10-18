import IUser from "../../../../shared/entities/interfaces/IUser";

interface ITodo {
  _id?: string;
  name?: string;
  completed: boolean;
  file_url: string;
  author: IUser;
  deadline: Date;
}

export default ITodo;
