import { UserToken } from '@core/domain/user-token';
import { UserTokenExpiredError } from '@core/exceptions/user-token-expired.error';
import { UserTokenInvalidError } from '@core/exceptions/user-token-invalid.error';
import AuthenticationUseCase from '@core/usecases/authentication.usecase';
import { InfrastructureError } from '@infrastructure/exceptions/infrastructure.error';
import { AuthenticationController } from '@presentation/controllers/authentication.controller';
import express from 'express';

describe('AuthenticationController', () => {
  let authenticationUseCase: AuthenticationUseCase;
  let authenticationController: AuthenticationController;

  beforeEach(() => {
    console.error = jest.fn();

    authenticationUseCase = {
      execute: jest.fn(),
    } as unknown as AuthenticationUseCase;

    authenticationController = new AuthenticationController(authenticationUseCase);
  });

  describe('handle', () => {
    let requestMock: express.Request;
    let responseMock: express.Response;

    beforeEach(() => {
      requestMock = {
        body: {
          email: 'thaua@example.com',
          password: 'notHashedPassword',
        },
      } as express.Request;

      responseMock = {
        json: jest.fn(),
        status: jest.fn(() => {
          return responseMock;
        }),
      } as unknown as express.Response;
    });

    describe('with error', () => {
      describe('in case of invalid token', () => {
        it('return JSON response with error', async () => {
          jest
            .spyOn(authenticationUseCase, 'execute')
            .mockRejectedValue(new UserTokenInvalidError());

          await authenticationController.handle(requestMock, responseMock);

          expect(authenticationUseCase.execute).toHaveBeenCalled();
          expect(responseMock.json).toHaveBeenCalledWith({
            error: {
              message: 'Invalid token!',
              name: 'UserTokenInvalidError',
            },
          });
          expect(responseMock.status).toHaveBeenCalledWith(400);
        });
      });

      describe('in case of expired token', () => {
        it('return JSON response with error', async () => {
          jest
            .spyOn(authenticationUseCase, 'execute')
            .mockRejectedValue(new UserTokenExpiredError());

          await authenticationController.handle(requestMock, responseMock);

          expect(authenticationUseCase.execute).toHaveBeenCalled();
          expect(responseMock.json).toHaveBeenCalledWith({
            error: {
              message: 'Token expired!',
              name: 'UserTokenExpiredError',
            },
          });
          expect(responseMock.status).toHaveBeenCalledWith(400);
        });
      });

      describe('in case of Infrastructure error', () => {
        const infrastructureErrorMessage = 'infrastructureErrorMessage';
        const infrastructureError = new Error('Error');

        it('return JSON response with error', async () => {
          jest
            .spyOn(authenticationUseCase, 'execute')
            .mockRejectedValue(
              new InfrastructureError(infrastructureErrorMessage, infrastructureError),
            );

          await authenticationController.handle(requestMock, responseMock);

          expect(authenticationUseCase.execute).toHaveBeenCalled();
          expect(responseMock.json).toHaveBeenCalledWith({
            error: {
              message: infrastructureErrorMessage,
            },
          });
          expect(responseMock.status).toHaveBeenCalledWith(502);
          expect(console.error).toHaveBeenCalledWith(
            infrastructureErrorMessage,
            infrastructureError,
          );
        });
      });

      describe('in case of unknown error', () => {
        const unknownError = new Error('unknown error');

        it('return JSON response with error', async () => {
          jest.spyOn(authenticationUseCase, 'execute').mockRejectedValue(unknownError);

          await authenticationController.handle(requestMock, responseMock);

          expect(authenticationUseCase.execute).toHaveBeenCalled();
          expect(responseMock.json).toHaveBeenCalledWith({
            error: {
              message: 'Internal Server Error.',
            },
          });
          expect(responseMock.status).toHaveBeenCalledWith(500);
          expect(console.error).toHaveBeenCalledWith('Unknown error caught.', unknownError);
        });
      });
    });

    describe('with success', () => {
      it('return JSON response with object returned', async () => {
        const mockUserToken: UserToken = {
          token: 'abcdef12345',
          expiration: 123456789,
        };

        jest.spyOn(authenticationUseCase, 'execute').mockResolvedValue(mockUserToken);

        await authenticationController.handle(requestMock, responseMock);

        expect(authenticationUseCase.execute).toHaveBeenCalledWith({
          email: 'thaua@example.com',
          password: 'notHashedPassword',
        });
        expect(responseMock.json).toHaveBeenCalledWith(mockUserToken);
        expect(responseMock.status).toHaveBeenCalledWith(200);
      });
    });
  });
});
