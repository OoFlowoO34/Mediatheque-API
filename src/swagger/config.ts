import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { SERVER } from '../config/server';
import { registerRoutes } from './routes/registerRoutes';

export function setupSwagger() {
  const registry = new OpenAPIRegistry();
  registerRoutes(registry);

  const generator = new OpenApiGeneratorV3(registry.definitions);
  const document = generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'API Médiathèque - Documentation',
      description: 'API pour la gestion des utilisateurs de la médiathèque',
    },
    servers: [{ url: `http://${SERVER.hostname}:${SERVER.port}` }],
  });

  const router = Router();
  router.use('/', swaggerUi.serve);
  router.get('/', swaggerUi.setup(document, {
    customSiteTitle: 'API Médiathèque - Documentation'
  }));
  return router;
}