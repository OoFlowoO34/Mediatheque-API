import { IRessourceService } from '../interfaces/IRessourceService';
import Ressource, { IRessources } from '../models/Ressource';
import {
  RessourceInput,
  RessourceUpdateInput,
} from '../schemas/ressourceSchema';

export class RessourceService implements IRessourceService {
  async createRessource(ressourceData: RessourceInput): Promise<IRessources> {
    const ressource = await Ressource.create(ressourceData);
    return await ressource.save();
  }

  async getAllRessources(): Promise<IRessources[]> {
    return await Ressource.find();
  }

  async getRessourceById(id: string): Promise<IRessources | null> {
    return await Ressource.findById(id);
  }

  async updateRessource(
    id: string,
    data: RessourceUpdateInput
  ): Promise<IRessources | null> {
    return await Ressource.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async deleteRessource(id: string): Promise<boolean> {
    const result = await Ressource.findByIdAndDelete(id);
    return !!result;
  }
}
