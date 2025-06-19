import express from 'express';
import { corsHandler } from './corsHandler';
import { loggingHandler } from './loggingHandler';

export const setupMiddlewares = (app: express.Application) => {
  app.use(corsHandler);
  app.use(loggingHandler);
  app.use(express.json());
};
