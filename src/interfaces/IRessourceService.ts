import { IRessources } from './../models/Ressource';
import {
  RessourceInput,
  RessourceUpdateInput,
} from '../schemas/ressourceSchema';

export interface IRessourceService {
  createRessource(ressourceData: RessourceInput): Promise<IRessources>;
  getAllRessources(): Promise<IRessources[]>;
  getRessourceById(id: string): Promise<IRessources | null>;
  updateRessource(
    id: string,
    userData: RessourceUpdateInput
  ): Promise<IRessources | null>;
  deleteRessource(id: string): Promise<boolean>;
}
