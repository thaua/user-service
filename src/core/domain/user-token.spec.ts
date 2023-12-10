import { UserToken } from '@core/domain/user-token';

describe('UserToken', () => {
  let userToken: UserToken;

  const mockedToken = '12345abcdef';
  const mockedExpiration = 1234567;

  beforeEach(() => {
    userToken = new UserToken();

    userToken.token = mockedToken;
    userToken.expiration = mockedExpiration;
  });

  it('should create an instance', () => {
    expect(userToken).toBeDefined();
  });

  it('should have correct properties', () => {
    expect(userToken.token).toBe(mockedToken);
    expect(userToken.expiration).toBe(mockedExpiration);
  });
});
