import { Hasher } from './hasher.interface';
import { PasswordHashInput } from '@core/security/hashers/password-hash-input.type';

export interface PasswordHasher extends Hasher<PasswordHashInput> {}
