import { PasswordHasherImpl } from '@infrastructure/security/hashers/password-hasher';
import { PasswordHashInput } from '@core/security/hashers/password-hasher.interface';

describe('PasswordHasherImpl', () => {
  let passwordHasher: PasswordHasherImpl;
  let passwordInput: PasswordHashInput;

  beforeEach(() => {
    passwordHasher = new PasswordHasherImpl();

    passwordInput = {
      email: 'thaua@example.com',
      password: 'testPassword123',
    };
  });

  describe('getHash', () => {
    it('should generate a hash', () => {
      const hash = passwordHasher.getHash(passwordInput);

      expect(hash).toBeDefined();
    });
  });

  describe('compareHash', () => {
    describe('with incorrect data', () => {
      it('should return false for non-matching hash and input', () => {
        const incorrectPasswordInput: PasswordHashInput = {
          email: 'thaua@example.com',
          password: 'testPassword1234',
        };

        const hash = passwordHasher.getHash(passwordInput);
        const isMatch = passwordHasher.compareHash(incorrectPasswordInput, hash);

        expect(isMatch).toBe(false);
      });
    });

    describe('with correct data', () => {
      it('should return true for matching hash and input', () => {
        const hash = passwordHasher.getHash(passwordInput);
        const isMatch = passwordHasher.compareHash(passwordInput, hash);

        expect(isMatch).toBe(true);
      });
    });
  });
});
