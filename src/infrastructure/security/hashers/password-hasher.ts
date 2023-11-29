import { Hash } from '@core/domain/hash.type';
import {
  PasswordHasher,
  PasswordHashInput,
} from '@core/security/hashers/password-hasher.interface';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

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
