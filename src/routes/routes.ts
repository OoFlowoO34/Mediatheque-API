import express from 'express';
import userRoutes from './userRoutes';

export const setupRoutes = (app: express.Application) => {
  app.use('/api/users', userRoutes);

  app.get('/', (_req, res) => {
    res.json({ message: "Server running" });
  });
};
