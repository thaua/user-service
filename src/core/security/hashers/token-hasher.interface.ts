import { Token } from '@core/domain/token.type';
import { User } from '@core/domain/user';
import { Hasher } from './hasher.interface';

export interface TokenHasher extends Hasher<User, Token> {}
