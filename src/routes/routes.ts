import express from "express";
import userRoutes from "./userRoutes";
import ressourceRoute from "./ressourceRoutes";
import empruntRoutes from './empruntRoutes';

export const setupRoutes = (app: express.Application) => {
  app.use("/api/users", userRoutes);
  app.use("/api/ressources", ressourceRoute);
  app.use('/api/emprunts', empruntRoutes);

  app.get("/", (_req, res) => {
    res.json({ message: "Server running" });
  });
};
