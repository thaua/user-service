import { User } from '@core/domain/user';
import RegistrationUseCase from '@core/usecases/registration.usecase';
import { ExpressControllerTemplate } from '@presentation/controllers/express-controller';
import express from 'express';

export class RegistrationController extends ExpressControllerTemplate<User> {
  constructor(private readonly registrationUseCase: RegistrationUseCase) {
    super();
  }

  async executeUseCase(request: express.Request): Promise<User> {
    return await this.registrationUseCase.execute({
      user: {
        name: request.body.name,
        email: request.body.email,
        photoUrl: request.body.photoUrl,
      },
      password: request.body.password,
    });
  }
}
