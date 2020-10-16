export interface IBaseRepository<T> {
  getAll(): Promise<T[]>;
  save(data: T): Promise<T>;
  bulkSave(data: T[]): Promise<T[]>;
  update(data: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
