import { Config } from '@infrastructure/data/interfaces/config.interface';

describe('AppConfig', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('creating', () => {
    const mockedServerPort: string | undefined = '1000';

    let AppConfig: Config;

    beforeEach(() => {
      process.env.PORT = mockedServerPort;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      AppConfig = require('@infrastructure/data/app-config').AppConfig;
    });

    describe('with environment variables', () => {
      it('defines object', async () => {
        expect(AppConfig).toBeDefined();
      });

      it('defines port', async () => {
        expect(AppConfig.serverPort).toEqual(mockedServerPort);
      });
    });
  });

  describe('with no environment variables', () => {
    let AppConfig: Config;

    beforeEach(() => {
      delete process.env.PORT;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      AppConfig = require('@infrastructure/data/app-config').AppConfig;
    });

    it('defines object', async () => {
      expect(AppConfig).toBeDefined();
    });

    it('defines port with default value', async () => {
      expect(AppConfig.serverPort).toEqual('3000');
    });
  });
});
