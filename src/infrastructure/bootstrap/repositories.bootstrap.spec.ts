import { userRepositoryPrisma } from '@infrastructure/bootstrap/repositories.bootstrap';

describe('Repositories bootstrap', () => {
  it('should set UserRepositoryPrisma', async () => {
    expect(userRepositoryPrisma).toBeDefined();
  });
});
