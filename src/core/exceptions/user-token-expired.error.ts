import { CoreApplicationError } from '@core/exceptions/core-application.error';

export class UserTokenExpiredError extends CoreApplicationError {
  constructor() {
    super('Token expired!');
    this.name = 'UserTokenExpiredError';
  }
}
