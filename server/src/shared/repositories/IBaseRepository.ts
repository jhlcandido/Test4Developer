export interface IBaseRepository<T> {
  getById(_id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  save(data: T): Promise<T>;
  bulkSave(data: T[]): Promise<T[]>;
  update(data: T): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
