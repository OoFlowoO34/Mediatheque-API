import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const empruntSchema = z.object({
  utilisateur: z.string().openapi({
    example: '6847de49a64a24abfcd0b9dd',
    description: 'Dernier ID MongoDB de l’utilisateur'
  }),
  ressources: z.array(z.string().openapi({
    example: '6847de75a64a24abfcd0b9e0',
    description: 'Dernier ID MongoDB de la ressource'
  })).min(1, 'Au moins une ressource est requise'),
  dateRetour: z.string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, 'Format attendu JJ-MM-AAAA')
    .openapi({
      example: '15-07-2025',
      description: 'Date de retour'
    })
}).openapi('EmpruntInput');

export const empruntUpdateSchema = empruntSchema.partial().openapi('EmpruntUpdateInput');
export type EmpruntInput = z.infer<typeof empruntSchema>;
