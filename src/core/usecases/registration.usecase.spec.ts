import { UserRepository } from '@core/repositories/user-repository.interface';
import { User } from '@core/domain/user';
import RegistrationInputDto from '@core/usecases/dtos/registration-input.dto';
import RegistrationUseCase from '@core/usecases/registration.usecase';

describe('RegistrationUseCase', () => {
  let registrationUseCase: RegistrationUseCase;
  let testRepository: UserRepository;

  beforeEach(() => {
    testRepository = {} as UserRepository;

    registrationUseCase = new RegistrationUseCase(testRepository);
  });

  describe('execute', () => {
    it('creates a new user', async () => {
      testRepository.create = jest.fn().mockResolvedValueOnce({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        photoUrl: 'https://example.com/photo.jpg',
        passwordHash: 'hashedPassword',
      } as User);

      const registrationDto: RegistrationInputDto = {
        user: {
          name: 'Test User',
          email: 'test@example.com',
          photoUrl: 'https://example.com/photo.jpg',
          passwordHash: 'hashedPassword',
        },
      };

      const user = await registrationUseCase.execute(registrationDto);

      expect(user.id).toBeDefined();
      expect(user.name).toBe('Test User');
      expect(user.email).toBe('test@example.com');
      expect(user.photoUrl).toBe('https://example.com/photo.jpg');
      expect(user.passwordHash).toBe('hashedPassword');

      expect(testRepository.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'Test User',
        photoUrl: 'https://example.com/photo.jpg',
        passwordHash: 'hashedPassword',
      });
    });
  });
});
