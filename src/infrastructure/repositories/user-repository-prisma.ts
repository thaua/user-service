import { UserRepository } from '@core/repositories/user-repository.interface';
import { User } from '@core/domain/user';
import { PrismaClient } from '@prisma/client';
import { Hash } from '@core/domain/hash.type';

export class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(model: Omit<User, 'id'>): Promise<User> {
    try {
      return this.mapEntityIntoModel(
        await this.prismaClient.user.create({
          data: {
            name: model.name,
            email: model.email,
            photoUrl: model.photoUrl,
            passwordHash: model.passwordHash,
          },
        }),
      );
    } catch (e) {
      // TODO: Create specific infrastructure database layer exception
      throw new Error(`Error on creating User. ${e}.`);
    }
  }

  async update(id: number, model: Partial<User>): Promise<User> {
    const user = await this.findOneBy({ id });

    if (!user) {
      throw new Error(`Error on updating User (User not found).`);
    } else {
      try {
        return await this.prismaClient.user.update({
          where: { id },
          data: this.mapModelIntoEntity(model),
        });
      } catch (e) {
        // TODO: Create specific infrastructure database layer exception
        throw new Error(`Error on updating User. ${e}.`);
      }
    }
  }

  async findAllBy(model: Partial<User>): Promise<User[]> {
    try {
      return (await this.prismaClient.user.findMany({ where: this.mapModelIntoEntity(model) })).map(
        (user) => this.mapEntityIntoModel(user),
      );
    } catch (e) {
      // TODO: Create specific infrastructure database layer exception
      throw new Error(`Error on finding Users. ${e}.`);
    }
  }

  async findOneBy(model: Partial<User>): Promise<User | null> {
    try {
      const userFound = await this.prismaClient.user.findFirst({
        where: this.mapModelIntoEntity(model),
      });

      if (userFound) {
        return this.mapEntityIntoModel(userFound);
      } else {
        return null;
      }
    } catch (e) {
      // TODO: Create specific infrastructure database layer exception
      throw new Error(`Error on finding User by id. ${e}.`);
    }
  }

  private mapEntityIntoModel(entity: {
    id: number;
    name: string;
    email: string;
    photoUrl: string | null;
    passwordHash: Hash;
  }): User {
    const user = new User();
    user.id = entity.id;
    user.name = entity.name;
    user.email = entity.email;
    user.photoUrl = entity.photoUrl;
    user.passwordHash = entity.passwordHash;
    return user;
  }

  private mapModelIntoEntity(model: Partial<User>): {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    photoUrl: string | null | undefined;
    passwordHash: Hash | undefined;
  } {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
      photoUrl: model.photoUrl,
      passwordHash: model.passwordHash,
    };
  }
}
