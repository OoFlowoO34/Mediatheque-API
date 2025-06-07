import { z } from 'zod';
import { registry } from '../config';
import { userSchema, userUpdateSchema } from '../../schemas/userSchema';

export function registerUserRoutes() {
  // POST /users - Créer un utilisateur
  registry.registerPath({
    method: 'post',
    path: '/api/users',
    tags: ['Users'],
    summary: 'Créer un nouvel utilisateur',
    request: { 
      body: { 
        content: { 
          'application/json': { 
            schema: userSchema
          } 
        } 
      } 
    },
    responses: {
      201: { 
        description: 'Utilisateur créé avec succès',
        content: {
          'application/json': {
            schema: userSchema
          }
        }
      },
      400: { description: 'Données invalides' }
    }
  });

  // GET /users - Liste des utilisateurs
  registry.registerPath({
    method: 'get',
    path: '/api/users',
    tags: ['Users'],
    summary: 'Récupérer tous les utilisateurs',
    responses: {
      200: { 
        description: 'Liste des utilisateurs',
        content: {
          'application/json': {
            schema: z.array(userSchema)
          }
        }
      }
    }
  });

  // GET /users/{id} - Récupérer un utilisateur
  registry.registerPath({
    method: 'get',
    path: '/api/users/{id}',
    tags: ['Users'],
    summary: 'Récupérer un utilisateur par ID',
    request: {
      params: z.object({
        id: z.string().openapi({ 
          description: 'ID de l\'utilisateur',
          example: '507f1f77bcf86cd799439011' 
        })
      })
    },
    responses: {
      200: { 
        description: 'Utilisateur trouvé',
        content: {
          'application/json': {
            schema: userSchema
          }
        }
      },
      404: { description: 'Utilisateur non trouvé' }
    }
  });

  // PUT /users/{id} - Mettre à jour un utilisateur
  registry.registerPath({
    method: 'put',
    path: '/api/users/{id}',
    tags: ['Users'],
    summary: 'Mettre à jour un utilisateur',
    request: {
      params: z.object({
        id: z.string().openapi({ description: 'ID de l\'utilisateur' })
      }),
      body: { 
        content: { 
          'application/json': { 
            schema: userUpdateSchema
          } 
        } 
      }
    },
    responses: {
      200: { 
        description: 'Utilisateur mis à jour',
        content: {
          'application/json': {
            schema: userSchema
          }
        }
      },
      404: { description: 'Utilisateur non trouvé' }
    }
  });

  // DELETE /users/{id} - Supprimer un utilisateur
  registry.registerPath({
    method: 'delete',
    path: '/api/users/{id}',
    tags: ['Users'],
    summary: 'Supprimer un utilisateur',
    request: {
      params: z.object({
        id: z.string().openapi({ description: 'ID de l\'utilisateur' })
      })
    },
    responses: {
      200: { description: 'Utilisateur supprimé' },
      404: { description: 'Utilisateur non trouvé' }
    }
  });
}