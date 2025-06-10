import { z } from 'zod';
import { registry } from '../config';
import {
  ressourceSchema,
  ressourceUpdateSchema,
} from '../../schemas/ressourceSchema';

export function registerRessourceRoutes() {
  // POST Créer une ressource
  registry.registerPath({
    method: 'post',
    path: '/api/ressources',
    tags: ['Ressources'],
    summary: 'Créer une nouvelle ressource',
    request: {
      body: {
        content: {
          'application/json': {
            schema: ressourceSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Ressources crée avec succès',
        content: {
          'application/json': {
            schema: ressourceSchema,
          },
        },
      },
      400: { description: 'Erreur création ressource' },
    },
  });

  // GET - Liste de toutes les ressources
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

  // GET - Récupérer une ressource
  registry.registerPath({
    method: 'get',
    path: '/api/ressources/{id}',
    tags: ['Ressources'],
    summary: 'Récupérer une ressource par son id',
    request: {
      params: z.object({
        id: z.string().openapi({
          description: 'Id ressource',
          example: '6847f3f52506ee021cd08d57',
        }),
      }),
    },
    responses: {
      200: {
        description: 'Ressource trouvée',
        content: {
          'application/json': {
            schema: ressourceSchema,
          },
        },
      },
      404: { description: 'Ressource non trouvée' },
    },
  });

  // PUT Mettre à jour une ressource
  registry.registerPath({
    method: 'put',
    path: '/api/ressource/{id}',
    tags: ['Ressources'],
    summary: 'Mettre à jour une ressource',
    request: {
      params: z.object({
        id: z.string().openapi({ description: 'ID de la ressource' }),
      }),
      body: {
        content: {
          'application/json': {
            schema: ressourceUpdateSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Ressource mise à jour',
        content: {
          'application/json': {
            schema: ressourceSchema,
          },
        },
      },
      404: { description: 'Ressource non trouvé' },
    },
  });

  // DELETE Supprimer une ressource
  registry.registerPath({
    method: 'delete',
    path: '/api/ressource/{id}',
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
