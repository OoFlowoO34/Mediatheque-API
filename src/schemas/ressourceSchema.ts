import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const ressourceBaseSchema = z.object({
  titre: z.string().min(1, 'Le titre est requis').openapi({
    example: 'Les fleurs du mal',
    description: 'Le titre de la ressource.',
  }),
  type: z
    .enum(['Livre', 'Jeu', 'Film', 'Autre'], {
      errorMap: () => ({ message: 'Type invalide, must be Livre, Jeu, Film or Autre' }),
    })
    .openapi({
      example: 'Livre',
      description: 'Le type de la ressource.',
    }),
  auteur: z.string().min(1, 'L’auteur est requis').openapi({
    example: 'Victor Hugo',
    description: "L'auteur de la ressource.",
  }),
  disponible: z.boolean().optional().default(true).openapi({
    example: true,
    description: 'Indique la disponibilité de la ressource.',
  }),
}).strict().openapi('RessourceBase');

// Schema used when creating a resource: no ressourceId needed
export const ressourceCreateSchema = ressourceBaseSchema.openapi("RessourceCreate");;

// Schema used when updating a resource: ressourceId is required
export const ressourceUpdateSchema = ressourceBaseSchema.partial().openapi('RessourceUpdate');

// Full resource schema: includes all fields including ressourceId (used for output)
export const ressourceSchema = ressourceBaseSchema.extend({
  ressourceId: z.string()
    .uuid({ message: 'Invalid UUID' })
    .openapi({
      example: '6847de75a64a24abfcd0b9e0',
      description: 'The ID of the resource.',
    }),
}).openapi('Ressource');

// TypeScript types
export type RessourceCreateZodType = z.infer<typeof ressourceCreateSchema>;
export type RessourceUpdateZodType = z.infer<typeof ressourceUpdateSchema>;
export type RessourceZodType = z.infer<typeof ressourceSchema>;