import { UserSession } from '@core/domain/user-session';

describe('UserSession', () => {
  let userSession: UserSession;

  const mockedName = 'Thauã Silveira';
  const mockedEmail = 'thaua@example.com';
  const mockedPhotoUrl = 'https://example.com/thaua.jpg';

  beforeEach(() => {
    userSession = new UserSession();

    userSession.name = mockedName;
    userSession.email = mockedEmail;
    userSession.photoUrl = mockedPhotoUrl;
  });

  it('should create an instance', () => {
    expect(userSession).toBeDefined();
  });

  it('should have correct properties', () => {
    expect(userSession.name).toBe(mockedName);
    expect(userSession.email).toBe(mockedEmail);
    expect(userSession.photoUrl).toBe(mockedPhotoUrl);
  });
});
