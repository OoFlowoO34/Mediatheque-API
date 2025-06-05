import { z } from 'zod';

export const userSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  mail: z.string().email("Format d'email invalide"),
  telephone: z.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Format de téléphone invalide"),
  nationalite: z.string().min(2, "La nationalité doit contenir au moins 2 caractères")
});

// Schéma pour la mise à jour (tous les champs optionnels)
export const userUpdateSchema = userSchema.partial();

// Types générés automatiquement
export type UserInput = z.infer<typeof userSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;