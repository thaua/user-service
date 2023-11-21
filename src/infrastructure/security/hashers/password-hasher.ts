import { PasswordHasher } from '@core/security/hashers/password-hasher.interface';
import { Hash } from '@core/security/hashers/hash.type';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { PasswordHashInput } from '@core/security/hashers/password-hash-input.type';

export class PasswordHasherImpl implements PasswordHasher {
  getHash(object: PasswordHashInput): Hash {
    // TODO: Move salt to Env Var
    const salt = genSaltSync(10);
    return hashSync(this.mountObjectString(object), salt);
  }

  compareHash(object: PasswordHashInput, hash: Hash): boolean {
    return compareSync(this.mountObjectString(object), hash);
  }

  private mountObjectString(object: PasswordHashInput): string {
    return Object.values(object).join();
  }
}
