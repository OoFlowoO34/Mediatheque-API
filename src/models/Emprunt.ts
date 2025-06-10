import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IEmprunt {
  utilisateur: Types.ObjectId;
  ressources: Types.ObjectId[];
  dateEmprunt: Date;
  dateRetour: Date;
  retourne: boolean;
}

export interface EmpruntDocument extends IEmprunt, Document {
  createdAt: Date;
  updatedAt: Date;
}

const EmpruntSchema = new Schema<EmpruntDocument>(
  {
    utilisateur: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ressources: [{ type: Schema.Types.ObjectId, ref: 'Ressource', required: true }],
    dateEmprunt: { type: Date, default: Date.now, required: true },
    dateRetour: { type: Date, required: true },
    retourne: { type: Boolean, default: false, required: true }
  },
  { timestamps: true }
);

export const EmpruntModel = mongoose.model<EmpruntDocument>('Emprunt', EmpruntSchema);
export default EmpruntModel;
