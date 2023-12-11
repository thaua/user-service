import AuthenticationUseCase from '@core/usecases/authentication.usecase';
import GetSessionUseCase from '@core/usecases/get-session.usecase';
import RegistrationUseCase from '@core/usecases/registration.usecase';
import { userRepositoryPrisma } from '@infrastructure/bootstrap/repositories.bootstrap';
import { PasswordHasherImpl } from '@infrastructure/security/hashers/password-hasher';
import { UserTokenerImpl } from '@infrastructure/security/hashers/user-tokener';

const passwordHasher = new PasswordHasherImpl();
const userTokener = new UserTokenerImpl();

export const registrationUseCase = new RegistrationUseCase(userRepositoryPrisma, passwordHasher);

export const authenticationUseCase = new AuthenticationUseCase(
  userRepositoryPrisma,
  passwordHasher,
  userTokener,
);

export const getSessionUseCase = new GetSessionUseCase(userTokener);
