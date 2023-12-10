import { Token } from '@core/domain/token.type';
import { User } from '@core/domain/user';
import { Tokener } from '@core/security/tokeners/tokener.interface';

export interface UserTokener extends Tokener<User, Token> {}
