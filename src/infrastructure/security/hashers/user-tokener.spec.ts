import { User } from '@core/domain/user';
import { UserTokenExpiredError } from '@core/exceptions/user-token-expired.error';
import { UserTokenInvalidError } from '@core/exceptions/user-token-invalid.error';
import { InfrastructureError } from '@infrastructure/exceptions/infrastructure.error';
import { UserTokenerImpl } from '@infrastructure/security/hashers/user-tokener';
import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('UserTokenerImpl', () => {
  const user: User = {
    id: 0,
    email: 'thaua@example.com',
    name: 'Thauã Silveira',
    passwordHash: '12345abcdef',
  };
  let userTokener: UserTokenerImpl;

  beforeEach(() => {
    userTokener = new UserTokenerImpl();
  });

  describe('tokenizing User', () => {
    const generatedToken = 'testToken';

    it('should generate a hash', () => {
      jest.spyOn(jwt, 'sign').mockReturnValue(generatedToken as any);

      const token = userTokener.tokenizeObject(user);

      expect(token).toEqual(generatedToken);
    });
  });

  describe('fetching object', () => {
    const validToken = 'validToken';
    const invalidToken = 'invalidToken';
    const expiredToken = 'expiredToken';

    describe('with incorrect token or secret', () => {
      it('should throw UserTokenInvalidError', () => {
        jest.spyOn(jwt, 'verify').mockImplementation(() => {
          throw new JsonWebTokenError('Invalid token');
        });

        expect(() => userTokener.fetchObject(invalidToken)).toThrow(UserTokenInvalidError);
      });
    });

    describe('with expired token', () => {
      it('should throw UserTokenExpiredError', () => {
        jest.spyOn(jwt, 'verify').mockImplementation(() => {
          throw new TokenExpiredError('Token expired', new Date());
        });

        expect(() => userTokener.fetchObject(expiredToken)).toThrow(UserTokenExpiredError);
      });
    });

    describe('with unknown error', () => {
      it('should throw InfrastructureError', () => {
        jest.spyOn(jwt, 'verify').mockImplementation(() => {
          throw new Error('Unknown error');
        });

        expect(() => userTokener.fetchObject(expiredToken)).toThrow(InfrastructureError);
      });
    });

    describe('with correct data', () => {
      it('should return the User object', () => {
        jest.spyOn(jwt, 'verify').mockReturnValue(user as any);

        const fetchedUser = userTokener.fetchObject(validToken);

        expect(fetchedUser).toEqual(user);
      });
    });
  });
});
