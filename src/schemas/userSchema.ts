import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const userBaseSchema = z.object({
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
}).strict().openapi("UserBase");

// For creation: no need for userId, it will be generated automatically
export const userCreateSchema = userBaseSchema.openapi("UserCreate");

// For update: all fields optional except userId (must be present to identify the user)
export const userUpdateSchema = userBaseSchema.partial().openapi("UserUpdate");

// Full user schema: includes userId (used for responses or internal usage)
export const userSchema = userBaseSchema.extend({
  userId: z.string().uuid(),
}).openapi('User');;

export type UserCreateZodType = z.infer<typeof userCreateSchema>;
export type UserUpdateZodType = z.infer<typeof userUpdateSchema>;
export type UserZodType = z.infer<typeof userSchema>;