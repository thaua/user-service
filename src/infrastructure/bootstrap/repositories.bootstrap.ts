import { UserRepositoryPrisma } from '@infrastructure/repositories/user-repository-prisma';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const userRepositoryPrisma = new UserRepositoryPrisma(prismaClient);
