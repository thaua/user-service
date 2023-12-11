import {
  authenticationUseCase,
  getSessionUseCase,
  registrationUseCase,
} from '@infrastructure/bootstrap/usecases.bootstrap';
import { AuthenticationController } from '@presentation/controllers/authentication.controller';
import { GetSessionController } from '@presentation/controllers/get-session.controller';
import { RegistrationController } from '@presentation/controllers/registration.controller';
import express from 'express';

export const appRouter = express.Router();

const registrationController = new RegistrationController(registrationUseCase);
const authenticationController = new AuthenticationController(authenticationUseCase);
const getSessionController = new GetSessionController(getSessionUseCase);

appRouter.post('/register', (request: express.Request, response: express.Response) =>
  registrationController.handle(request, response),
);

appRouter.post('/authenticate', (request: express.Request, response: express.Response) =>
  authenticationController.handle(request, response),
);

appRouter.get('/session', (request: express.Request, response: express.Response) =>
  getSessionController.handle(request, response),
);
