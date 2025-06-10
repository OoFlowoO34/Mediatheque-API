import { EmpruntModel, EmpruntDocument } from '../models/Emprunt';
import RessourceModel from '../models/Ressource';
import { Types } from 'mongoose';
import { EmpruntInput } from '../schemas/empruntSchema';
import { IEmpruntService } from '../interfaces/IEmpruntService';

export class EmpruntService implements IEmpruntService {
  async createEmprunt(data: EmpruntInput): Promise<EmpruntDocument[]> {
    const { utilisateur, ressources, dateRetour } = data;
    const dateRetourObj = parseFrDate(dateRetour);
    const today = new Date();

    const emprunts: EmpruntDocument[] = [];
    for (const rId of ressources) {
      const emprunt = await EmpruntModel.create({
        utilisateur: new Types.ObjectId(utilisateur),
        ressources: [new Types.ObjectId(rId)],
        dateEmprunt: today,
        dateRetour: dateRetourObj,
        retourne: false
      });
      emprunts.push(emprunt);
      await RessourceModel.findByIdAndUpdate(rId, { disponible: false });
    }
    return emprunts;
  }

  async getAllEmprunts(userId?: string): Promise<EmpruntDocument[]> {
    const filter = userId && Types.ObjectId.isValid(userId)
      ? { utilisateur: userId }
      : {};
    return EmpruntModel.find(filter)
      .populate('utilisateur', 'nom prenom')
      .populate('ressources', 'titre')
      .exec();
  }

  async getEmpruntById(id: string): Promise<EmpruntDocument | null> {
    return EmpruntModel.findById(id)
      .populate('utilisateur', 'nom prenom')
      .populate('ressources', 'titre')
      .exec();
  }

  async returnEmprunt(id: string): Promise<EmpruntDocument> {
    const emprunt = await EmpruntModel.findById(id);
    if (!emprunt) throw new Error('Emprunt non trouvé');
    if (emprunt.retourne) throw new Error('Emprunt déjà retourné');

    const resId = emprunt.ressources[0];
    const ressource = await RessourceModel.findById(resId);
    if (!ressource) throw new Error('Ressource introuvable');

    ressource.disponible = true;
    await ressource.save();

    emprunt.retourne = true;
    return emprunt.save();
  }

  async deleteEmprunt(id: string): Promise<boolean> {
    const { deletedCount } = await EmpruntModel.deleteOne({ _id: id });
    return deletedCount === 1;
  }
}

// Helper pour parser la date JJ-MM-AAAA
function parseFrDate(str: string): Date {
  const [jj, mm, aaaa] = str.split('-');
  return new Date(`${aaaa}-${mm}-${jj}T00:00:00.000Z`);
}
