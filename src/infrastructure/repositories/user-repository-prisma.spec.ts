import { UserRepositoryPrisma } from '@infrastructure/repositories/user-repository-prisma';
import { PrismaClient } from '@prisma/client';

describe('UserRepositoryPrisma', () => {
  let userRepository: UserRepositoryPrisma;
  let prismaClientMock: PrismaClient;

  beforeEach(() => {
    prismaClientMock = new PrismaClient();
    userRepository = new UserRepositoryPrisma(prismaClientMock);
  });

  describe('create', () => {
    it('creates a new user', async () => {
      jest.spyOn(prismaClientMock.user, 'create').mockResolvedValueOnce({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        photoUrl: 'https://example.com/photo.jpg',
        passwordHash: 'hashedPassword',
      });

      const user = await userRepository.create({
        name: 'Test User',
        email: 'test@example.com',
        photoUrl: 'https://example.com/photo.jpg',
        passwordHash: 'hashedPassword',
      });

      expect(prismaClientMock.user.create).toHaveBeenCalledWith({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          photoUrl: 'https://example.com/photo.jpg',
          passwordHash: 'hashedPassword',
        },
      });

      expect(user.id).toBeDefined();
      expect(user.name).toBe('Test User');
      expect(user.email).toBe('test@example.com');
      expect(user.photoUrl).toBe('https://example.com/photo.jpg');
      expect(user.passwordHash).toBe('hashedPassword');
    });

    it('handles errors during user creation', async () => {
      jest
        .spyOn(prismaClientMock.user, 'create')
        .mockRejectedValueOnce(new Error('Mocked Prisma Error'));

      await expect(async () => {
        await userRepository.create({
          name: 'Test User',
          email: 'test@example.com',
          photoUrl: 'https://example.com/photo.jpg',
          passwordHash: 'hashedPassword',
        });
      }).rejects.toThrowError('Error on creating User. Error: Mocked Prisma Error');
    });
  });

  describe('update', () => {
    describe('when user is not found', () => {
      beforeEach(() => {
        jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
      });

      it('throws error during user updating', async () => {
        await expect(async () => {
          await userRepository.update(1, {
            name: 'Test User 2',
          });
        }).rejects.toThrowError('Error on updating User (User not found).');
      });
    });

    describe('when user is found', () => {
      beforeEach(() => {
        jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce({
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          photoUrl: 'https://example.com/photo.jpg',
          passwordHash: 'hashedPassword',
        });
      });

      it('updates an user', async () => {
        jest.spyOn(prismaClientMock.user, 'update').mockResolvedValueOnce({
          id: 1,
          name: 'Test User 2',
          email: 'test@example.com',
          photoUrl: 'https://example.com/photo.jpg',
          passwordHash: 'hashedPassword',
        });

        const updatedUser = await userRepository.update(1, {
          name: 'Test User 2',
        });

        expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });

        expect(prismaClientMock.user.update).toHaveBeenCalledWith({
          where: { id: 1 },
          data: {
            name: 'Test User 2',
          },
        });

        expect(updatedUser.id).toBeDefined();
        expect(updatedUser.name).toBe('Test User 2');
        expect(updatedUser.email).toBe('test@example.com');
        expect(updatedUser.photoUrl).toBe('https://example.com/photo.jpg');
        expect(updatedUser.passwordHash).toBe('hashedPassword');
      });

      it('handles errors during user updating', async () => {
        jest
          .spyOn(prismaClientMock.user, 'update')
          .mockRejectedValueOnce(new Error('Mocked Prisma Error'));

        await expect(async () => {
          await userRepository.update(1, {
            name: 'Test User 2',
          });
        }).rejects.toThrowError('Error on updating User. Error: Mocked Prisma Error');
      });
    });
  });

  describe('findAllBy', () => {
    it('finds users', async () => {
      jest.spyOn(prismaClientMock.user, 'findMany').mockResolvedValueOnce([
        {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          photoUrl: 'https://example.com/photo.jpg',
          passwordHash: 'hashedPassword',
        },
      ]);

      const foundUser = await userRepository.findAllBy({
        name: 'Test User',
      });

      expect(prismaClientMock.user.findMany).toHaveBeenCalledWith({
        where: { name: 'Test User' },
      });

      expect(foundUser.length).toBe(1);
      expect(foundUser[0].id).toBeDefined();
      expect(foundUser[0].name).toBe('Test User');
      expect(foundUser[0].email).toBe('test@example.com');
      expect(foundUser[0].photoUrl).toBe('https://example.com/photo.jpg');
      expect(foundUser[0].passwordHash).toBe('hashedPassword');
    });

    it('handles errors during user finding', async () => {
      jest
        .spyOn(prismaClientMock.user, 'findMany')
        .mockRejectedValueOnce(new Error('Mocked Prisma Error'));

      await expect(async () => {
        await userRepository.findAllBy({
          name: 'Test User',
        });
      }).rejects.toThrowError('Error on finding Users. Error: Mocked Prisma Error');
    });
  });

  describe('findOneBy', () => {
    it('finds user', async () => {
      jest.spyOn(prismaClientMock.user, 'findFirst').mockResolvedValueOnce({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        photoUrl: 'https://example.com/photo.jpg',
        passwordHash: 'hashedPassword',
      });

      const foundUser = await userRepository.findOneBy({
        name: 'Test User',
      });

      expect(prismaClientMock.user.findFirst).toHaveBeenCalledWith({
        where: { name: 'Test User' },
      });

      expect(foundUser).not.toBeNull();
      expect(foundUser!.id).toBeDefined();
      expect(foundUser!.name).toBe('Test User');
      expect(foundUser!.email).toBe('test@example.com');
      expect(foundUser!.photoUrl).toBe('https://example.com/photo.jpg');
      expect(foundUser!.passwordHash).toBe('hashedPassword');
    });

    it('does not find user', async () => {
      jest.spyOn(prismaClientMock.user, 'findFirst').mockResolvedValueOnce(null);

      const foundUser = await userRepository.findOneBy({
        name: 'Test User 2',
      });

      expect(prismaClientMock.user.findFirst).toHaveBeenCalledWith({
        where: { name: 'Test User 2' },
      });

      expect(foundUser).toBeNull();
    });

    it('handles errors during user finding', async () => {
      jest
        .spyOn(prismaClientMock.user, 'findFirst')
        .mockRejectedValueOnce(new Error('Mocked Prisma Error'));

      await expect(async () => {
        await userRepository.findOneBy({
          name: 'Test User',
        });
      }).rejects.toThrowError('Error on finding User by id. Error: Mocked Prisma Error');
    });
  });
});
