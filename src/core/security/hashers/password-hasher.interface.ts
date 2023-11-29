import { Hasher } from './hasher.interface';

export type PasswordHashInput = { email: string; password: string };

export interface PasswordHasher extends Hasher<PasswordHashInput> {}
