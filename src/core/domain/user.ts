// TODO: Add timestamps

export class User {
  public id!: number;
  public name!: string;
  public email!: string;
  public photoUrl?: string | null;
  public passwordHash?: string | null;
}
