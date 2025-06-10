import mongoose, { Schema, Document } from 'mongoose';
import { RessourceInput } from '../schemas/ressourceSchema';

export interface IRessources extends Document, RessourceInput {}

const RessourceSchema: Schema = new Schema(
  {
    titre: { type: String, required: true },
    type: {
      type: String,
      enum: ['Livre', 'Jeu', 'Film', 'Autre'],
      required: true,
    },
    auteur: { type: String, required: true },
    disponible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRessources>('Ressource', RessourceSchema);
