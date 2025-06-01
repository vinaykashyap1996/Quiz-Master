import dotenv from "dotenv";

dotenv.config();

interface IMongoDBConfig {
  url: string;
}

interface IAuthConfig {
  mongodb: IMongoDBConfig;
}

interface IConfig {
  prod: boolean;
  localDev: boolean;
  port: number | string;
  production: boolean;
  auth: IAuthConfig;
}

const config: IConfig = {
  prod: process.env.PROD === "true",
  localDev: process.env.LOCALDEV === "true",
  port: process.env.PORT || 3000,
  production: process.env.PROD === "true",
  auth: {
    mongodb: {
      url: process.env.DB_HOST || "mongodb://localhost:27017/flashcards-app",
    },
  },
};

export default config;