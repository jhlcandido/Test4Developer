interface ITodo {
  _id?: string;
  name?: string;
  completed: boolean;
  file_url: string;
  deadline: string | Date;
}

export default ITodo;
