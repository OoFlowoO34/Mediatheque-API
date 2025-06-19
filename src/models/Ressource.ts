import mongoose, { Schema, Document } from 'mongoose';
import { RessourceZodType } from '../schemas/ressourceSchema';
import { v4 as uuidv4 } from 'uuid';
import { formatToFrDate } from '../utils/dateUtils';

export interface IRessources extends Document, RessourceZodType {}

const RessourceSchema: Schema = new Schema(
  {
    ressourceId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
      immutable: true,
    },
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
    toJSON: {
      transform(_, ret) {
        // Date formatting
        ret.createdAt = formatToFrDate(ret.createdAt);
        ret.updatedAt = formatToFrDate(ret.updatedAt);

        // Remove unnecessary fields for security purposes
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export default mongoose.model<IRessources>('Ressource', RessourceSchema);
