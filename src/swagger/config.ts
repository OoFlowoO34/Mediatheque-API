import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { userSchema, userUpdateSchema } from '../schemas/userSchema';
import { SERVER } from '../config/server';
import { z } from 'zod';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { registerRoutes } from './routes/routes';

// 1. Créer le registre OpenAPI
export const registry = new OpenAPIRegistry();

// 2. Enregistrer les routes


// 3. Générer le document OpenAPI
// Remplacer la fonction generateOpenApiDocument avec cette version corrigée
function generateOpenApiDocument() {
  // Initialiser avec la configuration de base
const generator = new OpenApiGeneratorV3(registry.definitions);
return generator.generateDocument({
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'API Médiathèque - Documentation',
    description: 'API pour la gestion des utilisateurs de la médiathèque',
  },
    servers: [{ url: `http://${SERVER.hostname}:${SERVER.port}` }],
});
}

// 4. Initialiser Swagger
export function setupSwagger() {
  registerRoutes();
  const router = Router();
  router.use('/', swaggerUi.serve);
  router.get('/', swaggerUi.setup(generateOpenApiDocument(), {
    customSiteTitle: 'API Médiathèque - Documentation'
  }));
  return router;
}