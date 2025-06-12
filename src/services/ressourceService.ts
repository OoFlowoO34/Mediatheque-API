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

  async getRessourceById(ressourceId: string): Promise<IRessources | null> {
    return await Ressource.findOne({ ressourceId: ressourceId });
  }

  async updateRessource(
    ressourceId: string,
    data: RessourceUpdateInput
  ): Promise<IRessources | null> {
    return await Ressource.findOneAndUpdate(
      { ressourceId: ressourceId },
      data,
      { new: true }
    );
  }

  async deleteRessource(ressourceId: string): Promise<boolean> {
    const result = await Ressource.findOneAndDelete({ressourceId : ressourceId});
    return !!result;
  }
}
