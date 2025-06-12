import mongoose, { Schema, Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { EmpruntInput } from '../schemas/empruntSchema';

export interface IEmprunt extends Document, EmpruntInput {}

const EmpruntSchema = new Schema(
  {
    ressourceId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
      immutable: true,
    },
    utilisateurId: { type: String, ref: 'User', required: true },
    dateEmprunt: { type: Date, default: Date.now, required: true },
    dateRetour: { type: Date, required: true },
    retourne: { type: Boolean, default: false, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IEmprunt>('Emprunt', EmpruntSchema);
