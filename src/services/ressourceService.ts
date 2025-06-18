import { IRessourceService } from '../interfaces/IRessourceService';
import RessourceModel, { IRessources } from '../models/Ressource';
import {
  RessourceCreateZodType,
  RessourceUpdateZodType,
} from '../schemas/ressourceSchema';
import { AppError } from '../utils/appError';

export class RessourceService implements IRessourceService {
  async createRessource(ressourceData: RessourceCreateZodType): Promise<IRessources> {
    const exists = await RessourceModel.findOne({
      titre: ressourceData.titre,
      auteur: ressourceData.auteur,
      type: ressourceData.type,
    });

    if (exists) {
      throw new AppError('A resource with the same title, author and type already exists', 400);
    }

    const ressource = await RessourceModel.create(ressourceData);
    return await ressource.save();
  }


  async getAllRessources(): Promise<IRessources[]> {
    return await RessourceModel.find();
  }

  async getRessourceById(ressourceId: string): Promise<IRessources> {
    const ressource = await RessourceModel.findOne({ ressourceId });
    if (!ressource) {
      throw new AppError('Resource not found', 404);
    }
    return ressource;
  }

  async updateRessource(
    ressourceId: string,
    data: RessourceUpdateZodType
  ): Promise<IRessources> {
    const duplicate = await RessourceModel.findOne({
      titre: data.titre,
      auteur: data.auteur,
      type: data.type,
      ressourceId: { $ne: ressourceId }, // exclude current resource
    });

    if (duplicate) {
      throw new AppError('Another resource with the same title, author and type already exists', 400);
    }

    const updated = await RessourceModel.findOneAndUpdate(
      { ressourceId },
      data,
      { new: true, runValidators: true }
    );

    if (!updated) {
      throw new AppError('Resource not found', 404);
    }

    return updated;
  }
  async deleteRessource(ressourceId: string): Promise<boolean> {
    const deleted = await RessourceModel.findOneAndDelete({ressourceId : ressourceId});
    if (!deleted) {
      throw new AppError('Resource not found', 404);
    }
    return true;
  }
}
