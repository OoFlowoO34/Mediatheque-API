import { z } from 'zod';
import { registry } from '../config';
import { empruntSchema } from '../../schemas/empruntSchema';

export function registerEmpruntRoutes() {
  registry.registerPath({
    method: 'get',
    path: '/api/emprunts',
    tags: ['Emprunts'],
    summary: 'Lister tous les emprunts',
    responses: {
      200: {
        description: 'Liste des emprunts',
        content: {
          'application/json': { schema: z.array(empruntSchema) },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/emprunts',
    tags: ['Emprunts'],
    summary: 'Créer un nouvel emprunt',
    request: {
      body: { content: { 'application/json': { schema: empruntSchema } } },
    },
    responses: {
      201: { description: 'Emprunt créé' },
      400: { description: 'Erreur de validation' },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/emprunts/{id}',
    tags: ['Emprunts'],
    summary: 'Récupérer un emprunt par ID',
    request: {
      params: z.object({
        id: z.string().openapi({
          description: "ID de l'emprunt",
          example: '507f1f77bcf86cd799439011',
        }),
      }),
    },
    responses: {
      200: { description: 'Emprunt trouvé', content: { 'application/json': { schema: empruntSchema } } },
      404: { description: 'Emprunt non trouvé' },
    },
  });

  registry.registerPath({
    method: 'put',
    path: '/api/emprunts/{id}/return',
    tags: ['Emprunts'],
    summary: 'Restituer un emprunt',
    request: {
      params: z.object({
        id: z.string().openapi({
          description: "ID de l'emprunt à restituer",
        }),
      }),
    },
    responses: {
      200: { description: 'Emprunt restitué' },
      404: { description: 'Emprunt non trouvé' },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/emprunts/{id}',
    tags: ['Emprunts'],
    summary: 'Supprimer un emprunt',
    request: {
      params: z.object({
        id: z.string().openapi({
          description: "ID de l'emprunt à supprimer",
        }),
      }),
    },
    responses: {
      200: { description: 'Emprunt supprimé' },
      404: { description: 'Emprunt non trouvé' },
    },
  });
}
