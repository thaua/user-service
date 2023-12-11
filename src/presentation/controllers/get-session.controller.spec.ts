import { UserSession } from '@core/domain/user-session';
import GetSessionUseCase from '@core/usecases/get-session.usecase';
import { GetSessionController } from '@presentation/controllers/get-session.controller';
import express from 'express';

describe('GetSessionController', () => {
  const testToken = 'anyToken';

  let getSessionUseCase: GetSessionUseCase;
  let getSessionController: GetSessionController;

  beforeEach(() => {
    console.error = jest.fn();

    getSessionUseCase = {
      execute: jest.fn(),
    } as unknown as GetSessionUseCase;

    getSessionController = new GetSessionController(getSessionUseCase);
  });

  describe('handle', () => {
    let requestMock: express.Request;
    let responseMock: express.Response;

    beforeEach(() => {
      requestMock = {
        headers: { 'user-token': testToken },
      } as unknown as express.Request;

      responseMock = {
        json: jest.fn(),
        status: jest.fn(() => {
          return responseMock;
        }),
      } as unknown as express.Response;
    });

    /*    describe('with error', () => {
      describe('in case of invalid token', () => {
        it('return JSON response with error', async () => {
          jest.spyOn(getSessionUseCase, 'execute').mockRejectedValue(new UserTokenInvalidError());

          await getSessionController.handle(requestMock, responseMock);

          expect(getSessionUseCase.execute).toHaveBeenCalled();
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
          jest.spyOn(getSessionUseCase, 'execute').mockRejectedValue(new UserTokenExpiredError());

          await getSessionController.handle(requestMock, responseMock);

          expect(getSessionUseCase.execute).toHaveBeenCalled();
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
            .spyOn(getSessionUseCase, 'execute')
            .mockRejectedValue(
              new InfrastructureError(infrastructureErrorMessage, infrastructureError),
            );

          await getSessionController.handle(requestMock, responseMock);

          expect(getSessionUseCase.execute).toHaveBeenCalled();
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
          jest.spyOn(getSessionUseCase, 'execute').mockRejectedValue(unknownError);

          await getSessionController.handle(requestMock, responseMock);

          expect(getSessionUseCase.execute).toHaveBeenCalled();
          expect(responseMock.json).toHaveBeenCalledWith({
            error: {
              message: 'Internal Server Error.',
            },
          });
          expect(responseMock.status).toHaveBeenCalledWith(500);
          expect(console.error).toHaveBeenCalledWith('Unknown error caught.', unknownError);
        });
      });
    });*/

    fdescribe('with success', () => {
      it('return JSON response with user session', async () => {
        const mockUserSession: UserSession = {
          id: 1,
          name: 'Thauã Silveira',
          email: 'thaua@example.com',
          photoUrl: 'https://example.com/photo.jpg',
        };

        jest.spyOn(getSessionUseCase, 'execute').mockResolvedValue(mockUserSession);

        await getSessionController.handle(requestMock, responseMock);

        expect(getSessionUseCase.execute).toHaveBeenCalledWith({ token: testToken });
        expect(responseMock.json).toHaveBeenCalledWith(mockUserSession);
        expect(responseMock.status).toHaveBeenCalledWith(200);
      });
    });
  });
});
