import { IRessources } from './../models/Ressource';
import {
  RessourceCreateZodType,
  RessourceUpdateZodType,
} from '../schemas/ressourceSchema';

export interface IRessourceService {
  createRessource(ressourceData: RessourceCreateZodType): Promise<IRessources>;
  getAllRessources(): Promise<IRessources[]>;
  getRessourceById(id: string): Promise<IRessources | null>;
  updateRessource(
    id: string,
    userData: RessourceUpdateZodType
  ): Promise<IRessources | null>;
  deleteRessource(id: string): Promise<boolean>;
}
