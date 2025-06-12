import { Response } from 'express';
import { EmpruntInput, EmpruntUpdateInput } from '../schemas/empruntSchema';
import { RequestId, RequestIdAndBody, RequestBody } from '../types/requests';
import { IEmpruntService } from '../interfaces/IEmpruntService';

export const createEmpruntController = (empruntService: IEmpruntService) => ({
  createEmprunt: async (req: RequestBody<EmpruntInput>, res: Response): Promise<void> => {
    try {
      const result = await empruntService.createEmprunt(req.body);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === 'Ressource non disponible') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erreur lors de la création de l\'emprunt', error });
      }
    }
  },
  getAllEmprunts: async (req: RequestId, res: Response): Promise<void> => {
    try {
      const emprunts = await empruntService.getAllEmprunts(req.params.id);
      res.status(200).json(emprunts);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des emprunts', error });
    }
  },
  getEmpruntById: async (req: RequestId, res: Response): Promise<void> => {
    try {
      const emprunt = await empruntService.getEmpruntById(req.params.id);
      if (!emprunt) {
        res.status(404).json({ message: 'Emprunt non trouvé' });
        return;
      }
      res.status(200).json(emprunt);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'emprunt', error });
    }
  },

  returnEmprunt: async (req: RequestIdAndBody<EmpruntUpdateInput>, res: Response): Promise<void> => {
    try {
      const emprunt = await empruntService.returnEmprunt(req.params.id);
      if (!emprunt) {
        res.status(404).json({ message: 'Emprunt non trouvé' });
        return;
      }
      res.status(200).json(emprunt);
    } catch (error) {
      res.status(400).json({ message: 'Erreur lors du retour de l\'emprunt', error });
    }
  },

  deleteEmprunt: async (req: RequestId, res: Response): Promise<void> => {
    try {
      const success = await empruntService.deleteEmprunt(req.params.id);
      if (!success) {
        res.status(404).json({ message: 'Emprunt non trouvé' });
        return;
      }
      res.status(200).json({ message: 'Emprunt supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'emprunt', error });
    }
  }
});