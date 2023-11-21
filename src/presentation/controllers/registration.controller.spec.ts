import express from 'express';
import RegistrationUseCase from '@core/usecases/registration.usecase';
import { RegistrationController } from '@presentation/controllers/registration.controller';
import { User } from '@core/domain/user';

describe('RegistrationController', () => {
  let registrationUseCase: RegistrationUseCase;
  let registrationController: RegistrationController;

  beforeEach(() => {
    registrationUseCase = {
      execute: jest.fn(),
    } as unknown as RegistrationUseCase;

    registrationController = new RegistrationController(registrationUseCase);
  });

  describe('handle', () => {
    let requestMock: express.Request;
    let responseMock: express.Response;

    beforeEach(() => {
      requestMock = {
        body: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          photoUrl: 'https://example.com/photo.jpg',
          passwordHash: 'hashedPassword',
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
      it('return JSON response with error', async () => {
        jest.spyOn(registrationUseCase, 'execute').mockRejectedValue(new Error('error'));

        await registrationController.handle(requestMock, responseMock);

        expect(registrationUseCase.execute).toHaveBeenCalled();
        expect(responseMock.json).toHaveBeenCalledWith({
          message: 'Internal Server Error.',
        });
        expect(responseMock.status).toHaveBeenCalledWith(500);
      });
    });

    describe('with success', () => {
      it('return JSON response with object returned', async () => {
        const mockRegisteredUser: User = {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          photoUrl: 'https://example.com/photo.jpg',
          passwordHash: 'hashedPassword',
        };

        jest.spyOn(registrationUseCase, 'execute').mockResolvedValue(mockRegisteredUser);

        await registrationController.handle(requestMock, responseMock);

        expect(registrationUseCase.execute).toHaveBeenCalledWith({
          user: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            photoUrl: 'https://example.com/photo.jpg',
            passwordHash: 'hashedPassword',
          },
        });
        expect(responseMock.json).toHaveBeenCalledWith(mockRegisteredUser);
        expect(responseMock.status).toHaveBeenCalledWith(200);
      });
    });
  });
});
