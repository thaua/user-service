import RegistrationInputDto from '@core/usecases/dtos/registration-input.dto';
import { UserRepository } from '@core/repositories/user-repository.interface';
import { User } from '@core/domain/user';
import { UseCase } from '@core/usecases/usecase.interface';
import { PasswordHasher } from '@core/security/hashers/password-hasher.interface';

export default class RegistrationUseCase implements UseCase<RegistrationInputDto, User> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(registrationDto: RegistrationInputDto): Promise<User> {
    return await this.userRepository.create({
      email: registrationDto.user.email,
      name: registrationDto.user.name,
      photoUrl: registrationDto.user.photoUrl,
      passwordHash: this.passwordHasher.getHash({
        email: registrationDto.user.email,
        password: registrationDto.password,
      }),
    });
  }
}
