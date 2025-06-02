import express from "express";
import userRoutes from "./userRoutes";
import ressourceRoute from "./RessourceRoutes";

export const setupRoutes = (app: express.Application) => {
  app.use("/api/users", userRoutes);
  app.use("/api/ressources", ressourceRoute);

  app.get("/", (_req, res) => {
    res.json({ message: "Server running" });
  });
};
