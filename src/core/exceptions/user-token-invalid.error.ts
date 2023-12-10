import { CoreApplicationError } from '@core/exceptions/core-application.error';

export class UserTokenInvalidError extends CoreApplicationError {
  constructor() {
    super('Invalid token!');
    this.name = 'UserTokenInvalidError';
  }
}
