export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly photoUrl: string,
    public readonly passwordHash: string,
  ) {}
}
