import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  nom: string;
  prenom: string;
  mail: string;
  telephone: string;
  nationalite: string;
}

const UserSchema: Schema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  nationalite: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);