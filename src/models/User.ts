import mongoose, { Schema, Document } from 'mongoose';
import { UserZodType } from '../schemas/userSchema';
import { v4 as uuidv4 } from 'uuid';
import { formatToFrDate } from '../utils/dateUtils';

export interface IUser extends Document, UserZodType {}

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
});

export default mongoose.model<IUser>('User', UserSchema);