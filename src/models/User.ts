import mongoose, { Schema, Document } from 'mongoose';
import { UserInput } from '../schemas/userSchema';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document, UserInput {}

// Mongoose schema for User from zod schema and additional properties
const UserSchema: Schema = new Schema({                 
    userId: {
        type: String,
        unique: true,
        default: () => uuidv4(), 
        immutable: true
    },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    nationalite: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);