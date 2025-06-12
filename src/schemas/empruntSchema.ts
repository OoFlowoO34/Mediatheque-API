import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const empruntSchema = z.object({
  utilisateurId: z.string()
    .min(1, 'L’ID de l’utilisateur est requis')
    .openapi({
      example: '6847de49a64a24abfcd0b9dd',
      description: 'ID de l’utilisateur'
  }),
  ressourceId: z.string()
    .min(1, 'L’ID de la ressource est requis')
    .openapi({
      example: '6847de75a64a24abfcd0b9e0',
      description: 'Id de la ressource empruntée'
    }),
  dateEmprunt: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format attendu YYYY-MM-DD')
    .openapi({
      example: '2024-07-15',
      description: 'Date d’emprunt'
    }),
  dateRetour: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format attendu YYYY-MM-DD')
    .optional()
    .openapi({
      example: '2025-07-15',
      description: 'Date de retour prévue (optionnelle, si non retourné)'
  }),
  retourne: z.boolean()
    .default(false)
    .openapi({
      example: false,
      description: 'Indique si l’emprunt a été retourné'
  })
}).openapi('EmpruntInput');

export const empruntUpdateSchema = empruntSchema.partial().openapi('EmpruntUpdateInput');

export type EmpruntInput = z.infer<typeof empruntSchema>;
export type EmpruntUpdateInput = z.infer<typeof empruntUpdateSchema>;
