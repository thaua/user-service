import { RegistrationController } from '@presentation/controllers/registration.controller';
import { registrationUseCase } from '@infrastructure/bootstrap/usecases.bootstrap';
import express from 'express';

export const appRouter = express.Router();

const registrationController = new RegistrationController(registrationUseCase);

appRouter.post('/users', (request: express.Request, response: express.Response) =>
  registrationController.handle(request, response),
);
