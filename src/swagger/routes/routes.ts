import { registerUserRoutes } from './userRoutes';
import { registerRessourceRoutes } from './ressourceRoutes';
import { registerEmpruntRoutes } from './empruntRoutes';


export const registerRoutes = () => {
  registerUserRoutes();
  registerRessourceRoutes();
  registerEmpruntRoutes();

};
