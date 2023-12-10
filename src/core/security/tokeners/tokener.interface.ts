import { Token } from '@core/domain/token.type';

export interface Tokener<T, H = Token> {
  tokenizeObject(object: T): H;

  fetchObject(token: H): T;
}
