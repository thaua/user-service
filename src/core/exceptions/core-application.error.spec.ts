import { CoreApplicationError } from './core-application.error';

class MockedCoreApplicationError extends CoreApplicationError {}

describe('UseCaseError', () => {
  it('should create an instance of UseCaseError', () => {
    const errorMessage = 'Test error message';
    const error = new MockedCoreApplicationError(errorMessage);

    expect(error).toBeInstanceOf(CoreApplicationError);
    expect(error.message).toBe(errorMessage);
  });
});
