import { Hash } from './hash.type';

export interface Hasher<T> {
  getHash(object: T): Hash;

  compareHash(object: T, hash: Hash): boolean;
}
