import 'reflect-metadata';
import mongoose from 'mongoose';

import config from './config/config';
import app from './app';

let server: any;

mongoose
  .connect(config.database.connectionURI, { dbName: config.database.name })
  .then(() => {
    server = app.listen(config.server.port);
  });

const exitHandler = () => {
  if (!server) process.exit(1);

  server.close(() => {
    process.exit(1);
  });
};

const unexpectedErrorHandler = (error: string) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  exitHandler();
});
