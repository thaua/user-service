import { Hash } from '../../domain/hash.type';

export interface Hasher<T> {
  getHash(object: T): Hash;

  compareHash(object: T, hash: Hash): boolean;
}
