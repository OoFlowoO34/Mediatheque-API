import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const userSchema = z.object({
  nom: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .openapi({ example: "Dupont", description: "Nom de l'utilisateur" }),

  prenom: z.string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .openapi({ example: "Jean", description: "Prénom de l'utilisateur" }),

  mail: z.string()
    .email("Format d'email invalide")
    .openapi({ example: "jean.dupont@example.com", description: "Adresse e-mail valide" }),

  telephone: z.string()
    .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Format de téléphone invalide")
    .openapi({ example: "+33612345678", description: "Numéro de téléphone au format international ou FR" }),

  nationalite: z.string()
    .min(2, "La nationalité doit contenir au moins 2 caractères")
    .openapi({ example: "Française", description: "Nationalité de l'utilisateur" }),
}).openapi("UserInput");

// Schéma pour la mise à jour (tous les champs optionnels)
export const userUpdateSchema = userSchema
  .partial()
  .openapi("UserUpdateInput");

export type UserInput = z.infer<typeof userSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;