export abstract class CoreApplicationError extends Error {
  constructor(public readonly message: string) {
    super();
  }
}
