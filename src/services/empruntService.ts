import EmpruntModel, { IEmprunt } from '../models/Emprunt';
import RessourceModel from '../models/Ressource';
import { EmpruntCreateZodType } from '../schemas/empruntSchema';
import { IEmpruntService } from '../interfaces/IEmpruntService';
import {formatToFrDate} from '../utils/dateUtils'; 
import { AppError } from '../utils/appError';

export class EmpruntService implements IEmpruntService {
  async createEmprunt(EmpruntData: EmpruntCreateZodType): Promise<IEmprunt> {
    const ressource = await RessourceModel.findOne({ ressourceId: EmpruntData.ressourceId });
    if (!ressource) {
      throw new AppError('Resource not found', 404);
    }
    if (!ressource.disponible) {
      throw new AppError('Resource not available', 400);
    }

    const emprunt = await EmpruntModel.create(EmpruntData);

    ressource.disponible = false;
    await ressource.save();

    return emprunt;
  }
  
  async getAllEmprunts(): Promise<IEmprunt[]> {
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
  }

  async getEmpruntById(empruntId: string): Promise<IEmprunt> {
    const emprunt = await EmpruntModel.findOne({ empruntId })
      .populate('utilisateurId')
      .populate('ressourceId')
      .exec();

    if (!emprunt) {
      throw new AppError('Resource not found', 404);
    }

    return emprunt;
  }

  async returnEmprunt(empruntId: string): Promise<IEmprunt> {
    const emprunt = await EmpruntModel.findOne({ empruntId });
    if (!emprunt) {
      throw new AppError('Emprunt not found', 404);
    }
    if (emprunt.retourne) {
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
  }

  async deleteEmprunt(empruntId: string): Promise<boolean> {
    const deleted = await EmpruntModel.deleteOne({ empruntId });
    if (!deleted) {
      throw new AppError('Resource not found', 404);
    }
    return true;
  }
}