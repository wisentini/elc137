import 'dotenv/config';

type ServerConfig = {
  env: string;
  port: number;
}

type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  name: string;
  connectionURI: string;
}

type Config = {
  server: ServerConfig;
  database: DatabaseConfig;
};

export default {
  server: {
    env: process.env.NODE_ENV,
    port: Number(process.env.PORT)
  },
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    connectionURI: process.env.DB_CON_URI
  }
} as Config;
