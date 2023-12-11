import { Token } from '@core/domain/token.type';
import { User } from '@core/domain/user';
import { UserTokenExpiredError } from '@core/exceptions/user-token-expired.error';
import { UserTokenInvalidError } from '@core/exceptions/user-token-invalid.error';
import { UserTokener } from '@core/security/tokeners/user-tokener.interface';
import { InfrastructureError } from '@infrastructure/exceptions/infrastructure.error';
import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export class UserTokenerImpl implements UserTokener {
  // TODO: Move secret and expiration to Env Var
  private readonly TOKEN_SECRET = 'developmentSecret';
  private readonly TOKEN_EXPIRATION_IN_HOURS = 24;

  tokenizeObject(object: User): Token {
    return jwt.sign(this.mapToPlainObject(object), this.TOKEN_SECRET, {
      expiresIn: `${this.TOKEN_EXPIRATION_IN_HOURS}h`,
    });
  }

  fetchObject(token: Token): User {
    try {
      return jwt.verify(token, this.TOKEN_SECRET) as User;
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UserTokenExpiredError();
      } else if (e instanceof JsonWebTokenError) {
        throw new UserTokenInvalidError();
      } else {
        throw new InfrastructureError('Unknown error on decoding token.', e as Error);
      }
    }
  }

  // TODO: improve this method
  private mapToPlainObject(object: User): object {
    return JSON.parse(JSON.stringify(object));
  }
}
