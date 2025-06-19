
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { registerUserRoutes } from './userRoutes';
import { registerRessourceRoutes } from './ressourceRoutes';
import { registerEmpruntRoutes } from './empruntRoutes';

export const registerRoutes = (registry: OpenAPIRegistry) => {
  registerUserRoutes(registry);
  registerRessourceRoutes(registry);
  registerEmpruntRoutes(registry);
};