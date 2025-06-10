import { registerUserRoutes } from './userRoutes';
import { registerRessourceRoutes } from './ressourceRoutes';

export const registerRoutes = () => {
  registerUserRoutes();
  registerRessourceRoutes();
};
