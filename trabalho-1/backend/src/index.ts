import 'reflect-metadata';
import mongoose from 'mongoose';

import config from './config/config';
import app from './app';

let server: any;

mongoose.connect(
  config.database.connectionURI,
  {
    dbName: config.database.name,
    user: config.database.user,
    pass: config.database.pass
  }
).then(() => {
  console.info('Connected to MongoDB');

  server = app.listen(config.server.port, () => {
    console.info(`Listening on port ${config.server.port}`);
  });
});

const exitHandler = () => {
  if (!server) process.exit(1);

  server.close(() => {
    console.info('Server closed');
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
  console.info('SIGTERM received');

  exitHandler();
});
