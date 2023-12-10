import {
  authenticationUseCase,
  registrationUseCase,
} from '@infrastructure/bootstrap/usecases.bootstrap';

describe('UseCases bootstrap', () => {
  it('should set RegistrationUseCase', async () => {
    expect(registrationUseCase).toBeDefined();
  });
  it('should set AuthenticationUseCase', async () => {
    expect(authenticationUseCase).toBeDefined();
  });
});
