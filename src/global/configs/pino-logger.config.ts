import { Params } from "nestjs-pino";

export const pinoLoggerConfig: Params = {
  pinoHttp: {
    prettyPrint: {
      colorize: true,
      levelFirst: true,
    }
  }
}