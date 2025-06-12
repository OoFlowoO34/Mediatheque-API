import Emprunt, { IEmprunt } from '../models/Emprunt';
import RessourceModel from '../models/Ressource';
import { Types } from 'mongoose';
import { EmpruntInput } from '../schemas/empruntSchema';
import { IEmpruntService } from '../interfaces/IEmpruntService';
import {formatToFrDate} from '../utils/dateUtils'; 

export class EmpruntService implements IEmpruntService {
  async createEmprunt(EmpruntData: EmpruntInput): Promise<IEmprunt> {
  // Vérification de la disponibilité de la ressource
  const ressource = await RessourceModel.findOne({ ressourceId: EmpruntData.ressourceId });
  if (!ressource) {
    throw new Error('Ressource non trouvée');
  }
  if (!ressource.disponible) {
    throw new Error('Ressource non disponible');
  }

  // Création de l'emprunt
  const emprunt = await Emprunt.create(EmpruntData);

  // Mise à jour de la ressource pour la marquer comme empruntée
  ressource.disponible = false;
  await ressource.save();
  return emprunt;
    
  }

  async getAllEmprunts(userId?: string): Promise<IEmprunt[]> {
    const filter = userId && Types.ObjectId.isValid(userId)
      ? { utilisateur: userId }
      : {};
    return Emprunt.find(filter)
      .populate('utilisateur')
      .populate('ressources')
      .exec();
  }

  async getEmpruntById(empruntId: string): Promise<IEmprunt | null> {
    return Emprunt.findOne({ empruntId })
      .populate('utilisateur')
      .populate('ressources')
      .exec();
  }

  async returnEmprunt(empruntId: string): Promise<IEmprunt> {
    const emprunt = await Emprunt.findOne({ empruntId });
    if (!emprunt) throw new Error('Emprunt non trouvé');
    if (emprunt.retourne) throw new Error('Emprunt déjà retourné');

    const resId = emprunt.ressourceId;
    const ressource = await RessourceModel.findById(resId);
    if (!ressource) throw new Error('Ressource introuvable');

    ressource.disponible = true;
    await ressource.save();

    emprunt.retourne = true;
    return emprunt.save();
  }

  async deleteEmprunt(empruntId: string): Promise<boolean> {
    const { deletedCount } = await Emprunt.deleteOne({ empruntId: empruntId });
    return deletedCount === 1;
  }
}