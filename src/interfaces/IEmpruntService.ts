import { EmpruntDocument } from '../models/Emprunt';
import { EmpruntInput } from '../schemas/empruntSchema';

export interface IEmpruntService {
  createEmprunt(data: EmpruntInput): Promise<EmpruntDocument[]>;
  getAllEmprunts(userId?: string): Promise<EmpruntDocument[]>;
  getEmpruntById(id: string): Promise<EmpruntDocument | null>;
  returnEmprunt(id: string): Promise<EmpruntDocument>;
  deleteEmprunt(id: string): Promise<boolean>;
}
