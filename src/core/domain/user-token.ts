import { Token } from '@core/domain/token.type';

export class UserToken {
  public token: Token;
  public expiration: number;
}
