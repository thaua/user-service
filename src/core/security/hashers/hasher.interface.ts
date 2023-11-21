import { Hash } from './hash.type';

export interface Hasher<T> {
  getHash(object: T): Hash;
}
