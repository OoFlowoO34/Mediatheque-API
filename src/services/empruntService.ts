import EmpruntModel, { IEmprunt } from '../models/Emprunt';
import RessourceModel from '../models/Ressource';
import { EmpruntCreateZodType } from '../schemas/empruntSchema';
import { IEmpruntService } from '../interfaces/IEmpruntService';
import {formatToFrDate} from '../utils/dateUtils'; 
import { AppError } from '../utils/appError';
import type { LogHelper } from '../utils/logger/loggerHelper';

export const createEmpruntService = (logger: LogHelper): IEmpruntService => {
  return {
    createEmprunt : async (EmpruntData: EmpruntCreateZodType): Promise<IEmprunt>  => {
      const ressource = await RessourceModel.findOne({ ressourceId: EmpruntData.ressourceId });
      console.log(EmpruntData);
      if (!ressource) {
        logger.error(`Resource with ID ${EmpruntData.ressourceId} not found`);
        throw new AppError('Resource not found', 404);
      }
      if (!ressource.disponible) {
        logger.error(`Resource with ID ${EmpruntData.ressourceId} is not available for borrowing`);
        throw new AppError('Resource not available', 400);
      }

      const emprunt = await EmpruntModel.create(EmpruntData);

      ressource.disponible = false;
      await ressource.save();
      return emprunt;
    },
    
    getAllEmprunts : async () : Promise<IEmprunt[]> => {
    return EmpruntModel.find()
      .populate({
        path: 'utilisateurId',
        model: 'User',
        localField: 'utilisateurId',
        foreignField: 'userId',         
        justOne: true
      })
      .populate({
        path: 'ressourceId',
        model: 'Ressource',
        localField: 'ressourceId',      
        foreignField: 'ressourceId',  
        justOne: true
      })
      .exec();
    },

    getEmpruntById : async(empruntId: string): Promise<IEmprunt> => {
      const emprunt = await EmpruntModel.findOne({ empruntId })
        .populate('utilisateurId')
        .populate('ressourceId')
        .exec();

      if (!emprunt) {
        logger.error(`Emprunt with ID ${empruntId} not found`);
        throw new AppError('Resource not found', 404);
      }

      return emprunt;
    },

    returnEmprunt: async (empruntId: string): Promise<IEmprunt>  => {
      const emprunt = await EmpruntModel.findOne({ empruntId });
      if (!emprunt) {
        logger.error(`Emprunt with ID ${empruntId} not found`);
        throw new AppError('Emprunt not found', 404);
      }
      if (emprunt.retourne) {
        logger.error(`Emprunt with ID ${empruntId} has already been returned`);
        throw new AppError('Emprunt already returned', 400);
      }

      const ressource = await RessourceModel.findOne({ ressourceId: emprunt.ressourceId });
      if (!ressource) {
        throw new AppError('Resource not found', 404);
      }

      ressource.disponible = true;
      await ressource.save();

      emprunt.retourne = true;
      return emprunt.save();
    },

    deleteEmprunt : async(empruntId: string): Promise<boolean> =>{
      const deleted = await EmpruntModel.deleteOne({ empruntId });
      if (!deleted) {
        logger.error(`Emprunt with ID ${empruntId} not found for deletion`);
        throw new AppError('Resource not found', 404);
      }
      return true;
    }
  }
}