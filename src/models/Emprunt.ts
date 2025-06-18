import mongoose, { Schema, Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { EmpruntZodType } from '../schemas/empruntSchema';

export interface IEmprunt extends Document, EmpruntZodType {}

const EmpruntSchema = new Schema(
  {
    empruntId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
      immutable: true
    },
    ressourceId: { type: String, ref: 'Ressource', required: true },
    utilisateurId: { type: String, ref: 'User', required: true },
    dateEmprunt: { type: Date, default: Date.now, required: true },
    dateRetour: { type: Date, required: true },
    retourne: { type: Boolean, default: false, required: true }
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export default mongoose.model<IEmprunt>('Emprunt', EmpruntSchema);
