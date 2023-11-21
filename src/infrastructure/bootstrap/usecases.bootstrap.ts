import { userRepositoryPrisma } from '@infrastructure/bootstrap/repositories.bootstrap';
import RegistrationUseCase from '@core/usecases/registration.usecase';

export const registrationUseCase = new RegistrationUseCase(userRepositoryPrisma);
