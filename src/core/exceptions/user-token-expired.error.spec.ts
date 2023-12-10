import { CoreApplicationError } from '@core/exceptions/core-application.error';
import { UserTokenExpiredError } from '@core/exceptions/user-token-expired.error';

describe('UserTokenExpiredError', () => {
  it('should be an instance of CoreApplicationError', () => {
    const error = new UserTokenExpiredError();

    expect(error).toBeInstanceOf(CoreApplicationError);
  });

  it('should have the correct name', () => {
    const error = new UserTokenExpiredError();

    expect(error.name).toBe('UserTokenExpiredError');
  });

  it('should have the correct message', () => {
    const error = new UserTokenExpiredError();

    expect(error.message).toBe('Token expired!');
  });
});
