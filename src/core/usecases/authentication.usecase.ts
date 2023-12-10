import { UserToken } from '@core/domain/user-token';
import { UserRepository } from '@core/repositories/user-repository.interface';
import { PasswordHasher } from '@core/security/hashers/password-hasher.interface';
import { UserTokener } from '@core/security/tokeners/user-tokener.interface';
import AuthenticationInputDto from '@core/usecases/dtos/authentication-input.dto';
import { InvalidCredentialsError } from '@core/usecases/exceptions/invalid-credentials.error';
import { UseCase } from '@core/usecases/usecase.interface';

export default class AuthenticationUseCase implements UseCase<AuthenticationInputDto, UserToken> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly userTokener: UserTokener,
  ) {}

  async execute(authenticationDto: AuthenticationInputDto): Promise<UserToken> {
    const userFound = await this.userRepository.findOneBy({
      email: authenticationDto.email,
    });

    if (
      userFound &&
      this.passwordHasher.compareHash(
        {
          email: authenticationDto.email,
          password: authenticationDto.password,
        },
        userFound.passwordHash,
      )
    ) {
      // TODO: Remove passwordHash from the object (maybe the repository mapping does not need it)
      return {
        token: this.userTokener.tokenizeObject(userFound),
        expiration: 0,
      } as UserToken;
    } else {
      throw new InvalidCredentialsError();
    }
  }
}
