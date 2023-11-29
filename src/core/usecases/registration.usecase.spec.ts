import { User } from '@core/domain/user';
import { UserRepository } from '@core/repositories/user-repository.interface';
import {
  PasswordHasher,
  PasswordHashInput,
} from '@core/security/hashers/password-hasher.interface';
import RegistrationInputDto from '@core/usecases/dtos/registration-input.dto';
import RegistrationUseCase from '@core/usecases/registration.usecase';

describe('RegistrationUseCase', () => {
  let registrationUseCase: RegistrationUseCase;
  let testRepository: UserRepository;
  let testPasswordHasher: PasswordHasher;

  beforeEach(() => {
    testRepository = {} as UserRepository;
    testPasswordHasher = {} as PasswordHasher;

    registrationUseCase = new RegistrationUseCase(testRepository, testPasswordHasher);
  });

  describe('execute', () => {
    const inputEmail = 'test@example.com';
    const inputPassword = 'notHashedPassword';
    const expectedHashedPassword = 'hashedPassword';
    const expectedGeneratedId = 1;

    beforeEach(() => {
      testRepository.create = jest.fn().mockResolvedValueOnce({
        id: expectedGeneratedId,
        name: 'Test User',
        email: inputEmail,
        photoUrl: 'https://example.com/photo.jpg',
        passwordHash: expectedHashedPassword,
      } as User);

      testPasswordHasher.getHash = jest.fn().mockReturnValue(expectedHashedPassword);
    });

    it('creates a new user', async () => {
      const registrationDto: RegistrationInputDto = {
        user: {
          name: 'Test User',
          email: inputEmail,
          photoUrl: 'https://example.com/photo.jpg',
        },
        password: inputPassword,
      };

      const user = await registrationUseCase.execute(registrationDto);

      expect(user.id).toBe(expectedGeneratedId);
      expect(user.name).toBe('Test User');
      expect(user.email).toBe(inputEmail);
      expect(user.photoUrl).toBe('https://example.com/photo.jpg');
      expect(user.passwordHash).toBe(expectedHashedPassword);

      expect(testRepository.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'Test User',
        photoUrl: 'https://example.com/photo.jpg',
        passwordHash: expectedHashedPassword,
      });
      expect(testPasswordHasher.getHash).toHaveBeenCalledWith({
        email: inputEmail,
        password: inputPassword,
      } as PasswordHashInput);
    });
  });
});
