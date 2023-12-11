import { UserSession } from '@core/domain/user-session';
import GetSessionUseCase from '@core/usecases/get-session.usecase';
import { ExpressControllerTemplate } from '@presentation/controllers/express-controller';
import express from 'express';

export class GetSessionController extends ExpressControllerTemplate<UserSession> {
  private readonly TOKEN_NAME = 'user-token';

  constructor(private readonly getSessionUseCase: GetSessionUseCase) {
    super();
  }

  async executeUseCase(request: express.Request): Promise<UserSession> {
    return await this.getSessionUseCase.execute({
      token: String(request.headers[this.TOKEN_NAME]),
    });
  }
}
