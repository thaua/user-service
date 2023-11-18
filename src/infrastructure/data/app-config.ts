import {Config} from "@infrastructure/data/interfaces/config.interface";

export const AppConfig: Config = {
  serverPort: String(process.env.PORT) || '3000'
}
