import { z } from 'zod';
import { registry } from '../config';
import { ressourceSchema, ressourceUpdateSchema } from '../../schemas/ressourceSchema';

export function registerRessourceRoutes() {
  registry.registerPath({
    method: 'get',
    path: '/api/ressources',
    tags: ['Ressources'],
    summary: 'Lister toutes les ressources',
    responses: {
      200: {
        description: 'Liste des ressources',
        content: {
          'application/json': {
            schema: z.array(ressourceSchema),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/ressources',
    tags: ['Ressources'],
    summary: 'Créer une nouvelle ressource',
    request: {
      body: {
        content: {
          'application/json': { schema: ressourceSchema },
        },
      },
    },
    responses: {
      201: { description: 'Ressource créée' },
      400: { description: 'Erreur de validation' },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/ressources/{id}',
    tags: ['Ressources'],
    summary: 'Récupérer une ressource par ID',
    request: {
      params: z.object({
        id: z.string().openapi({
          description: 'ID de la ressource',
          example: '507f1f77bcf86cd799439011',
        }),
      }),
    },
    responses: {
      200: { description: 'Ressource trouvée', content: { 'application/json': { schema: ressourceSchema } } },
      404: { description: 'Ressource non trouvée' },
    },
  });

  registry.registerPath({
    method: 'put',
    path: '/api/ressources/{id}',
    tags: ['Ressources'],
    summary: 'Mettre à jour une ressource',
    request: {
      params: z.object({
        id: z.string().openapi({ description: 'ID de la ressource' }),
      }),
      body: { content: { 'application/json': { schema: ressourceUpdateSchema } } },
    },
    responses: {
      200: { description: 'Ressource mise à jour', content: { 'application/json': { schema: ressourceSchema } } },
      404: { description: 'Ressource non trouvée' },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/ressources/{id}',
    tags: ['Ressources'],
    summary: 'Supprimer une ressource',
    request: {
      params: z.object({
        id: z.string().openapi({ description: 'ID de la ressource' }),
      }),
    },
    responses: {
      200: { description: 'Ressource supprimée' },
      404: { description: 'Ressource non trouvée' },
    },
  });
}
