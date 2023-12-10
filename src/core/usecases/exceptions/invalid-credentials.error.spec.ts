import { CoreApplicationError } from '@core/exceptions/core-application.error';
import { InvalidCredentialsError } from '@core/usecases/exceptions/invalid-credentials.error';

describe('InvalidCredentialsError', () => {
  it('should be mounted correctly', () => {
    const invalidCredentialsError = new InvalidCredentialsError();

    expect(invalidCredentialsError).toBeInstanceOf(CoreApplicationError);
    expect(invalidCredentialsError.message).toBe('Invalid credentials.');
    expect(invalidCredentialsError.name).toBe('InvalidCredentialsError');
  });
});
