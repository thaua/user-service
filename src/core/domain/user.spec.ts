import { User } from '@domain/user';

describe('User', () => {
  let user: User;

  const mockedName = 'Thauã Silveira';
  const mockedEmail = 'thaua@example.com';
  const mockedPhotoUrl = 'https://example.com/thaua.jpg';
  const mockedPasswordHash = 'hashedPassword';

  beforeEach(() => {
    user = new User();

    user.name = mockedName;
    user.email = mockedEmail;
    user.photoUrl = mockedPhotoUrl;
    user.passwordHash = mockedPasswordHash;
  });

  it('should create an instance', () => {
    expect(user).toBeDefined();
  });

  it('should have correct properties', () => {
    expect(user.name).toBe(mockedName);
    expect(user.email).toBe(mockedEmail);
    expect(user.photoUrl).toBe(mockedPhotoUrl);
    expect(user.passwordHash).toBe(mockedPasswordHash);
  });
});
