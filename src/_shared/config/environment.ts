import { configDotenv } from "dotenv";

export type EnvType = 'development' | 'production' | 'local';
configDotenv();

export const EnvVarsValues = [
  'APP_ENV',
  'DB_HOST',
  'DB_PORT',
  'DB_DATABASE',
  'DB_USERNAME',
  'DB_PASSWORD',
] as const;
export type EnvVars = (typeof EnvVarsValues)[number];

export class Environment {
  static getVar(varName: string): string {
    return process.env[varName] as string;
  }

  static getEnvType(): EnvType {
    switch (process.env.APP_ENV) {
      case 'production':
        return 'production';
      case 'development':
        return 'development';
      case 'local':
      default:
        return 'local';
    }
  }
}