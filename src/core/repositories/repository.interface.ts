export interface Repository<T> {
  create(model: Omit<T, 'id'>): Promise<T>;
  update(id: number, model: Partial<T>): Promise<T>;
  findAllBy(model: Partial<T>): Promise<T[]>;
  findOneBy(model: Partial<T>): Promise<T | null>;
}
