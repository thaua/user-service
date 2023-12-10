import { CoreApplicationError } from '@core/exceptions/core-application.error';

export class InvalidCredentialsError extends CoreApplicationError {
  constructor() {
    super('Invalid credentials.');
    this.name = 'InvalidCredentialsError';
  }
}
