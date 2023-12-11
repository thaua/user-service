import { UserSession } from '@core/domain/user-session';
import { UserTokenExpiredError } from '@core/exceptions/user-token-expired.error';
import { UserTokenInvalidError } from '@core/exceptions/user-token-invalid.error';
import { UserTokener } from '@core/security/tokeners/user-tokener.interface';
import GetSessionInputDto from '@core/usecases/dtos/get-session-input.dto';
import GetSessionUseCase from '@core/usecases/get-session.usecase';

describe('GetSessionUseCase', () => {
  let getSessionUseCase: GetSessionUseCase;
  let testUserTokener: UserTokener;

  const getSessionInputDto: GetSessionInputDto = {
    token: 'inputToken',
  };

  beforeEach(() => {
    testUserTokener = {} as UserTokener;

    getSessionUseCase = new GetSessionUseCase(testUserTokener);
  });

  describe('execute', () => {
    describe('with UserTokenInvalidError error', () => {
      beforeEach(async () => {
        testUserTokener.fetchObject = jest.fn().mockImplementation(() => {
          throw new UserTokenInvalidError();
        });
      });

      it('throws UserTokenInvalidError forward', () => {
        return expect(
          async () => await getSessionUseCase.execute(getSessionInputDto),
        ).rejects.toThrow(new UserTokenInvalidError());
      });
    });

    describe('with UserTokenExpiredError error', () => {
      beforeEach(async () => {
        testUserTokener.fetchObject = jest.fn().mockImplementation(() => {
          throw new UserTokenExpiredError();
        });
      });

      it('throws UserTokenExpiredError forward', () => {
        return expect(
          async () => await getSessionUseCase.execute(getSessionInputDto),
        ).rejects.toThrow(new UserTokenExpiredError());
      });
    });

    describe('with unknown error', () => {
      const error = new Error('error');

      beforeEach(async () => {
        testUserTokener.fetchObject = jest.fn().mockImplementation(() => {
          throw error;
        });
      });

      it('throws error forward', () => {
        expect(async () => await getSessionUseCase.execute(getSessionInputDto)).rejects.toThrow(
          error,
        );
      });
    });

    describe('with success', () => {
      let result: UserSession;
      const mockDecodedObject: object = {
        id: 1,
        email: 'thaua@example.com',
        name: 'Thauã Silveira',
        photoUrl: 'anyUrl',
      };
      const mockedUserSession: UserSession = {
        id: 1,
        email: 'thaua@example.com',
        name: 'Thauã Silveira',
        photoUrl: 'anyUrl',
      };

      beforeEach(async () => {
        testUserTokener.fetchObject = jest.fn().mockReturnValue(mockDecodedObject);

        result = await getSessionUseCase.execute(getSessionInputDto);
      });

      it('returns user session', () => {
        expect(result).toStrictEqual(mockedUserSession);
      });
    });
  });
});
