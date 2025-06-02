import mongoose, { Schema, Document } from "mongoose";

export interface IRessources extends Document {
  titre: string;
  type: string;
  auteur: string;
  disponible: boolean;
}

const RessourceSchema: Schema = new Schema(
  {
    titre: { type: String, required: true },
    type: {
      type: String,
      enum: ["Livre", "Jeu", "Film", "Autre"],
      required: true,
    },
    auteur: { type: String, required: true, unique: true },
    disponible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRessources>("Ressource", RessourceSchema);
