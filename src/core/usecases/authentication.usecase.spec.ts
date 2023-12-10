import { User } from '@core/domain/user';
import { UserToken } from '@core/domain/user-token';
import { UserRepository } from '@core/repositories/user-repository.interface';
import {
  PasswordHasher,
  PasswordHashInput,
} from '@core/security/hashers/password-hasher.interface';
import { TokenHasher } from '@core/security/hashers/token-hasher.interface';
import AuthenticationUseCase from '@core/usecases/authentication.usecase';
import { InvalidCredentialsError } from '@core/usecases/exceptions/invalid-credentials.error';

describe('AuthenticationUseCase', () => {
  let authenticationUseCase: AuthenticationUseCase;
  let testRepository: UserRepository;
  let testPasswordHasher: PasswordHasher;
  let testTokenHasher: TokenHasher;

  beforeEach(() => {
    testRepository = {} as UserRepository;
    testPasswordHasher = {} as PasswordHasher;
    testTokenHasher = {} as TokenHasher;

    authenticationUseCase = new AuthenticationUseCase(
      testRepository,
      testPasswordHasher,
      testTokenHasher,
    );
  });

  describe('execute', () => {
    const inputEmail = 'test@example.com';
    const inputPassword = 'notHashedPassword';
    const hashedPassword = 'hashedPassword';

    beforeEach(async () => {
      testPasswordHasher.getHash = jest.fn().mockReturnValue(hashedPassword);
    });

    describe('with no user and credentials found', () => {
      beforeEach(async () => {
        testRepository.findOneBy = jest.fn().mockResolvedValueOnce(null);

        await expect(
          authenticationUseCase.execute({
            email: inputEmail,
            password: inputPassword,
          }),
        ).rejects.toThrow(new InvalidCredentialsError());
      });

      it('calls PasswordHasher with email and password', async () => {
        expect(testPasswordHasher.getHash).toHaveBeenCalledWith({
          email: inputEmail,
          password: inputPassword,
        } as PasswordHashInput);
      });

      it('calls UserRepository findOneBy with email and hashed password', async () => {
        expect(testRepository.findOneBy).toHaveBeenCalledWith({
          email: inputEmail,
          passwordHash: hashedPassword,
        } as Partial<User>);
      });
    });

    describe('with user and credentials found', () => {
      const user = {
        id: 1,
        name: 'anyName',
        email: inputEmail,
        passwordHash: hashedPassword,
        photoUrl: 'anyPhotoUrl',
      } as User;
      const token = 'testToken';
      let result: UserToken;

      beforeEach(async () => {
        testRepository.findOneBy = jest.fn().mockResolvedValueOnce(user);
        testTokenHasher.getHash = jest.fn().mockReturnValue(token);

        result = await authenticationUseCase.execute({
          email: inputEmail,
          password: inputPassword,
        });
      });

      it('calls PasswordHasher with email and password', async () => {
        expect(testPasswordHasher.getHash).toHaveBeenCalledWith({
          email: inputEmail,
          password: inputPassword,
        } as PasswordHashInput);
      });

      it('calls UserRepository findOneBy with email and hashed password', async () => {
        expect(testRepository.findOneBy).toHaveBeenCalledWith({
          email: inputEmail,
          passwordHash: hashedPassword,
        } as Partial<User>);
      });

      it('calls TokenHasher to get token hash', async () => {
        expect(testTokenHasher.getHash).toHaveBeenCalledWith(user);
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
