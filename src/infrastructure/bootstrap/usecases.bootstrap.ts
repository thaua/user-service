import AuthenticationUseCase from '@core/usecases/authentication.usecase';
import RegistrationUseCase from '@core/usecases/registration.usecase';
import { userRepositoryPrisma } from '@infrastructure/bootstrap/repositories.bootstrap';
import { PasswordHasherImpl } from '@infrastructure/security/hashers/password-hasher';
import { UserTokenerImpl } from '@infrastructure/security/hashers/user-tokener';

const passwordHasher = new PasswordHasherImpl();

export const registrationUseCase = new RegistrationUseCase(userRepositoryPrisma, passwordHasher);

export const authenticationUseCase = new AuthenticationUseCase(
  userRepositoryPrisma,
  passwordHasher,
  new UserTokenerImpl(),
);
