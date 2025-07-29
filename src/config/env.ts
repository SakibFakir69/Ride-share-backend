import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  MONGODB_URL: string;
  NODE_ENV: string;
}

const envVars: EnvConfig = {
  PORT: process.env.PORT as string,
  MONGODB_URL: process.env.MONGODB_URL as string,
  NODE_ENV: process.env.NODE_ENV as string,
};

export const loadEnvVariable = (): EnvConfig => {
  const requiredEnv: string[] = ["NODE_ENV", "MONGODB_URL", "PORT"];

  requiredEnv.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing env  ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    MONGODB_URL: process.env.MONGODB_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
  };
};
