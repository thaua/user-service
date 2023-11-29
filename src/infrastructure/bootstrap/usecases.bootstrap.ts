import { userRepositoryPrisma } from '@infrastructure/bootstrap/repositories.bootstrap';
import RegistrationUseCase from '@core/usecases/registration.usecase';
import { PasswordHasherImpl } from '@infrastructure/security/hashers/password-hasher';

export const registrationUseCase = new RegistrationUseCase(
  userRepositoryPrisma,
  new PasswordHasherImpl(),
);
