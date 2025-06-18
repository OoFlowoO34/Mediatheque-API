import { IEmprunt } from '../models/Emprunt';
import { EmpruntCreateZodType } from '../schemas/empruntSchema';

export interface IEmpruntService {
  createEmprunt(data: EmpruntCreateZodType): Promise<IEmprunt>;
  getAllEmprunts(): Promise<IEmprunt[]>;
  getEmpruntById(id: string): Promise<IEmprunt | null>;
  returnEmprunt(id: string): Promise<IEmprunt>;
  deleteEmprunt(id: string): Promise<boolean>;
}