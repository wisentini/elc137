import 'dotenv/config';

type ServerConfig = {
  env: string;
  port: number;
}

type DatabaseConfig = {
  name: string;
  connectionURI: string;
  replicaSet: string;
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
    name: process.env.DB_NAME,
    connectionURI: process.env.DB_CON_URI,
    replicaSet: process.env.DB_REPLICA_SET
  }
} as Config;
