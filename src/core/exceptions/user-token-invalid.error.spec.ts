import { CoreApplicationError } from '@core/exceptions/core-application.error';
import { UserTokenInvalidError } from '@core/exceptions/user-token-invalid.error';

describe('UserTokenInvalidError', () => {
  it('should be an instance of CoreApplicationError', () => {
    const error = new UserTokenInvalidError();

    expect(error).toBeInstanceOf(CoreApplicationError);
  });

  it('should have the correct name', () => {
    const error = new UserTokenInvalidError();

    expect(error.name).toBe('UserTokenInvalidError');
  });

  it('should have the correct message', () => {
    const error = new UserTokenInvalidError();

    expect(error.message).toBe('Invalid token!');
  });
});
