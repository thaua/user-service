import {
  authenticationUseCase,
  registrationUseCase,
} from '@infrastructure/bootstrap/usecases.bootstrap';
import { AuthenticationController } from '@presentation/controllers/authentication.controller';
import { RegistrationController } from '@presentation/controllers/registration.controller';
import express from 'express';

export const appRouter = express.Router();

const registrationController = new RegistrationController(registrationUseCase);
const authenticationController = new AuthenticationController(authenticationUseCase);

appRouter.post('/users', (request: express.Request, response: express.Response) =>
  registrationController.handle(request, response),
);

appRouter.post('/users/authenticate', (request: express.Request, response: express.Response) =>
  authenticationController.handle(request, response),
);

// TODO: Add controllers
// appRouter.post('/users/confirm', (request: express.Request, response: express.Response) =>
//   registrationConfirmation.handle(request, response),
// );
//
//
// appRouter.post('/users/validate', (request: express.Request, response: express.Response) =>
//   validationController.handle(request, response),
// );
