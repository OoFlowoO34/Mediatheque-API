import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const ressourceSchema = z.object({
  titre: z.string().min(1, 'Le titre est requis').openapi({
    example: 'Les fleurs du mal',
    description: 'Le titre de la ressource.',
  }),
  type: z
    .enum(['Livre', 'Jeu', 'Film', 'Autre'], {
      errorMap: () => ({ message: 'Type invalide' }),
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
}).openapi('RessourceInput');

export const ressourceUpdateSchema = ressourceSchema
  .partial()
  .openapi('RessourceUpdateInput');

export type RessourceInput = z.infer<typeof ressourceSchema>;
export type RessourceUpdateInput = z.infer<typeof ressourceUpdateSchema>;
