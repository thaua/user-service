export class InfrastructureError extends Error {
  constructor(
    public readonly message: string,
    public readonly details: Error,
  ) {
    super();
  }
}
