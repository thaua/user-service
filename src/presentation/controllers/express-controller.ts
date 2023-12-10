import { CoreApplicationError } from '@core/exceptions/core-application.error';
import { InfrastructureError } from '@infrastructure/exceptions/infrastructure.error';
import { HttpResponseError } from '@presentation/interfaces/http-response-error.interface';
import express from 'express';

export abstract class ExpressControllerTemplate<T> {
  async handle(request: express.Request, response: express.Response): Promise<void> {
    try {
      response.status(200).json(await this.executeUseCase(request));
    } catch (e) {
      if (e instanceof CoreApplicationError) {
        // TODO: Specialize errors, like unauthorized being 401 and so on
        response.status(400).json(this.formatHttpError(e));
      } else if (e instanceof InfrastructureError) {
        console.error(e.message, e.details);

        response.status(502).json(this.formatHttpError(e));
      } else {
        console.error('Unknown error caught.', e);

        response.status(500).json(
          this.formatHttpError({
            message: 'Internal Server Error.',
          } as Error),
        );
      }
    }
  }

  abstract executeUseCase(request: express.Request): Promise<T>;

  private formatHttpError(error: Error): HttpResponseError {
    const errorWithoutDetails = { ...error };

    delete (errorWithoutDetails as any).details;

    return {
      error: errorWithoutDetails,
    };
  }
}
