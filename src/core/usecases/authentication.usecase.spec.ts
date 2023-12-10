import { User } from '@core/domain/user';
import { UserToken } from '@core/domain/user-token';
import { UserRepository } from '@core/repositories/user-repository.interface';
import { PasswordHasher } from '@core/security/hashers/password-hasher.interface';
import { UserTokener } from '@core/security/tokeners/user-tokener.interface';
import AuthenticationUseCase from '@core/usecases/authentication.usecase';
import { InvalidCredentialsError } from '@core/usecases/exceptions/invalid-credentials.error';

describe('AuthenticationUseCase', () => {
  let authenticationUseCase: AuthenticationUseCase;
  let testRepository: UserRepository;
  let testPasswordHasher: PasswordHasher;
  let testUserTokener: UserTokener;

  const inputEmail = 'test@example.com';
  const inputPassword = 'notHashedPassword';
  const hashedPassword = 'hashedPassword';

  const user = {
    id: 1,
    name: 'anyName',
    email: inputEmail,
    passwordHash: hashedPassword,
    photoUrl: 'anyPhotoUrl',
  } as User;

  beforeEach(() => {
    testRepository = {} as UserRepository;
    testPasswordHasher = {} as PasswordHasher;
    testUserTokener = {} as UserTokener;

    authenticationUseCase = new AuthenticationUseCase(
      testRepository,
      testPasswordHasher,
      testUserTokener,
    );
  });

  describe('execute', () => {
    beforeEach(async () => {
      testPasswordHasher.getHash = jest.fn().mockReturnValue(hashedPassword);
      testPasswordHasher.compareHash = jest.fn().mockReturnValue(false);
    });

    describe('with no user found', () => {
      beforeEach(async () => {
        testRepository.findOneBy = jest.fn().mockResolvedValueOnce(null);

        await expect(
          authenticationUseCase.execute({
            email: inputEmail,
            password: inputPassword,
          }),
        ).rejects.toThrow(new InvalidCredentialsError());
      });

      it('calls UserRepository findOneBy with email and hashed password', async () => {
        expect(testRepository.findOneBy).toHaveBeenCalledWith({
          email: inputEmail,
        } as Partial<User>);
      });
    });

    describe('with invalid credentials', () => {
      beforeEach(async () => {
        testRepository.findOneBy = jest.fn().mockResolvedValueOnce(user);

        await expect(
          authenticationUseCase.execute({
            email: inputEmail,
            password: inputPassword,
          }),
        ).rejects.toThrow(new InvalidCredentialsError());
      });

      it('calls PasswordHasher to compare token hash', async () => {
        expect(testPasswordHasher.compareHash).toHaveBeenCalledWith(
          { email: inputEmail, password: inputPassword },
          user.passwordHash,
        );
      });

      it('calls UserRepository findOneBy with email and hashed password', async () => {
        expect(testRepository.findOneBy).toHaveBeenCalledWith({
          email: inputEmail,
        } as Partial<User>);
      });
    });

    describe('with user and credentials found', () => {
      const token = 'testToken';
      let result: UserToken;

      beforeEach(async () => {
        testRepository.findOneBy = jest.fn().mockResolvedValueOnce(user);
        testUserTokener.tokenizeObject = jest.fn().mockReturnValue(token);
        testPasswordHasher.compareHash = jest.fn().mockReturnValue(true);

        result = await authenticationUseCase.execute({
          email: inputEmail,
          password: inputPassword,
        });
      });

      it('calls UserRepository findOneBy with email and hashed password', async () => {
        expect(testRepository.findOneBy).toHaveBeenCalledWith({
          email: inputEmail,
        } as Partial<User>);
      });

      it('calls TokenHasher to get token hash', async () => {
        expect(testUserTokener.tokenizeObject).toHaveBeenCalledWith(user);
      });

      it('calls PasswordHasher to compare token hash', async () => {
        expect(testPasswordHasher.compareHash).toHaveBeenCalledWith(
          { email: inputEmail, password: inputPassword },
          user.passwordHash,
        );
      });

      it('returns generated token hash', async () => {
        expect(result).toStrictEqual({
          token,
          expiration: 0,
        });
      });
    });
  });
});
