import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const empruntBaseSchema = z.object({
  utilisateurId: z.string()
    .uuid({ message: "UUID invalide" })
    .openapi({
      example: '6847de49a64a24abfcd0b9dd',
      description: 'ID de l’utilisateur'
  }),
  ressourceId: z.string().uuid({ message: "UUID invalide" })
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
}).strict().openapi('EmpruntBase');

export const empruntCreateSchema = empruntBaseSchema.openapi("EmpruntCreate");

// Schema used for updating a loan
// All fields are optional except empruntId, which is required and must be a valid UUID
export const empruntUpdateSchema = empruntBaseSchema.partial().openapi('EmpruntUpdate');

// Full loan schema including the mandatory loanId field
export const empruntSchema = empruntBaseSchema.extend({
  empruntId: z.string()
    .uuid({ message: "UUID invalide" })
    .openapi({
      example: '6847de49a64a24abfcd0b9dd',
      description: 'ID de l’emprunt'
    }),
}).openapi('Emprunt');

export type EmpruntCreateZodType = z.infer<typeof empruntCreateSchema>;
export type EmpruntUpdateZodType = z.infer<typeof empruntUpdateSchema>;
export type EmpruntZodType = z.infer<typeof empruntSchema>;
