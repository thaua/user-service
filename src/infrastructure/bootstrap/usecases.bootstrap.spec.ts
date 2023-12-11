import {
  authenticationUseCase,
  getSessionUseCase,
  registrationUseCase,
} from '@infrastructure/bootstrap/usecases.bootstrap';

describe('UseCases bootstrap', () => {
  it('should set RegistrationUseCase', async () => {
    expect(registrationUseCase).toBeDefined();
  });

  it('should set AuthenticationUseCase', async () => {
    expect(authenticationUseCase).toBeDefined();
  });

  it('should set GetSessionUseCase', async () => {
    expect(getSessionUseCase).toBeDefined();
  });
});
