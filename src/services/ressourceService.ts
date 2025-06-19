import { IRessourceService } from '../interfaces/IRessourceService';
import RessourceModel, { IRessources } from '../models/Ressource';
import {
  RessourceCreateZodType,
  RessourceUpdateZodType,
} from '../schemas/ressourceSchema';
import { AppError } from '../utils/appError';
import type { LogHelper } from '../utils/logger/loggerHelper';

export const CreateRessourceService = (logger : LogHelper): IRessourceService => {
  return {
    createRessource : async (
      ressourceData: RessourceCreateZodType
    ): Promise<IRessources> => {
      const ressource = await RessourceModel.create(ressourceData);
      return await ressource.save();
    },

    getAllRessources : async (): Promise<IRessources[]> => {
      return await RessourceModel.find();
    },

    getRessourceById : async (
      ressourceId: string
    ): Promise<IRessources> => {
      const ressource = await RessourceModel.findOne({ ressourceId });
      if (!ressource) {
        logger.error(`Resource with ID ${ressourceId} not found`);
        throw new AppError('Resource not found', 404);
      }
      return ressource;
    },

    updateRessource : async (
      ressourceId: string,
      data: RessourceUpdateZodType
    ): Promise<IRessources> => {
      const duplicate = await RessourceModel.findOne({
        titre: data.titre,
        auteur: data.auteur,
        type: data.type,
        ressourceId: { $ne: ressourceId },
      });

      if (duplicate) {
        logger.error(`Another resource with the same title, author and type already exists: ${data.titre}, ${data.auteur}, ${data.type}`);
        throw new AppError('Another resource with the same title, author and type already exists', 400);
      }

      const updated = await RessourceModel.findOneAndUpdate(
        { ressourceId },data,{ new: true, runValidators: true }
      );

      if (!updated) {
        logger.error(`Resource with ID ${ressourceId} not found for update`);
        throw new AppError('Resource not found', 404);
      }

      return updated;
    },

    deleteRessource : async (ressourceId: string): Promise<boolean> => {
      const deleted = await RessourceModel.findOneAndDelete({ ressourceId });
      if (!deleted) {
        logger.error(`Resource with ID ${ressourceId} not found for deletion`);
        throw new AppError('Resource not found', 404);
      }
      return true;
    }
  };
};
