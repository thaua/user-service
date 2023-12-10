import { UserToken } from '@core/domain/user-token';
import { UserRepository } from '@core/repositories/user-repository.interface';
import { PasswordHasher } from '@core/security/hashers/password-hasher.interface';
import { TokenHasher } from '@core/security/hashers/token-hasher.interface';
import AuthenticationInputDto from '@core/usecases/dtos/authentication-input.dto';
import { InvalidCredentialsError } from '@core/usecases/exceptions/invalid-credentials.error';
import { UseCase } from '@core/usecases/usecase.interface';

export default class AuthenticationUseCase implements UseCase<AuthenticationInputDto, UserToken> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenHasher: TokenHasher,
  ) {}

  async execute(authenticationDto: AuthenticationInputDto): Promise<UserToken> {
    const inputHash = this.passwordHasher.getHash({
      email: authenticationDto.email,
      password: authenticationDto.password,
    });

    const userFound = await this.userRepository.findOneBy({
      email: authenticationDto.email,
      passwordHash: inputHash,
    });

    if (userFound) {
      return {
        token: this.tokenHasher.getHash(userFound),
        expiration: 0,
      } as UserToken;
    } else {
      throw new InvalidCredentialsError();
    }
  }
}
