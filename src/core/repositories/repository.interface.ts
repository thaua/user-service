export interface Repository<T> {
  findById(id: number): T | null;

  find(model: Partial<T>): T[];

  create(model: T): T;

  update(id: number, model: T): T;
}
