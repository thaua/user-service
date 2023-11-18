import { InfrastructureError } from '@infrastructure/exceptions/infrastructure.error';

class MockedInfrastructureError extends InfrastructureError {}

describe('InfrastructureError', () => {
  it('should create an instance of InfrastructureError', () => {
    const errorMessage = 'Test error message';
    const errorDetails = new Error('Error message');
    const error = new MockedInfrastructureError(errorMessage, errorDetails);

    expect(error).toBeInstanceOf(InfrastructureError);
    expect(error.message).toBe(errorMessage);
    expect(error.details).toBe(errorDetails);
  });
});
