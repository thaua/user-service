import { UserToken } from '@core/domain/user-token';
import AuthenticationUseCase from '@core/usecases/authentication.usecase';
import { ExpressControllerTemplate } from '@presentation/controllers/express-controller';
import express from 'express';

export class AuthenticationController extends ExpressControllerTemplate<UserToken> {
  constructor(private readonly authenticationUseCase: AuthenticationUseCase) {
    super();
  }

  async executeUseCase(request: express.Request): Promise<UserToken> {
    const emailInput = request.body.email;
    const passwordInput = request.body.password;

    return await this.authenticationUseCase.execute({
      email: emailInput,
      password: passwordInput,
    });
  }
}
