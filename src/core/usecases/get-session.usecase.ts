import { User } from '@core/domain/user';
import { UserSession } from '@core/domain/user-session';
import { UserTokener } from '@core/security/tokeners/user-tokener.interface';
import GetSessionInputDto from '@core/usecases/dtos/get-session-input.dto';
import { UseCase } from '@core/usecases/usecase.interface';

export default class GetSessionUseCase implements UseCase<GetSessionInputDto, UserSession> {
  constructor(private readonly userTokener: UserTokener) {}

  async execute(getSessionInputDto: GetSessionInputDto): Promise<UserSession> {
    return this.mapUserToUserSession(this.userTokener.fetchObject(getSessionInputDto.token));
  }

  private mapUserToUserSession(user: User): UserSession {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
    };
  }
}
