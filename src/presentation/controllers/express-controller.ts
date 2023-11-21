import express from 'express';

export abstract class ExpressControllerTemplate<T> {
  async handle(request: express.Request, response: express.Response): Promise<void> {
    try {
      response.status(200).json(await this.executeUseCase(request));
    } catch (e) {
      // TODO: Add error handler by layered errors
      response.status(500).json({
        message: 'Internal Server Error.',
      });
    }
  }

  abstract executeUseCase(request: express.Request): Promise<T>;
}
