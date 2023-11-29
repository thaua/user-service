// TODO: Add timestamps

import { Hash } from '@core/domain/hash.type';

export class User {
  public id: number;
  public name: string;
  public email: string;
  public photoUrl?: string | null;
  public passwordHash: Hash;
}
