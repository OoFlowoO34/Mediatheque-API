import { IEmprunt } from '../models/Emprunt';
import { EmpruntInput } from '../schemas/empruntSchema';

export interface IEmpruntService {
  createEmprunt(data: EmpruntInput): Promise<IEmprunt>;
  getAllEmprunts(userId?: string): Promise<IEmprunt[]>;
  getEmpruntById(id: string): Promise<IEmprunt | null>;
  returnEmprunt(id: string): Promise<IEmprunt>;
  deleteEmprunt(id: string): Promise<boolean>;
}
