import { Hash } from '../../domain/hash.type';

export interface Hasher<T, H = Hash> {
  getHash(object: T): H;

  compareHash(object: T, hash: H): boolean;
}
