import { Request, Response } from 'express';
import { EmpruntService } from '../services/empruntService';
import { empruntSchema } from '../schemas/empruntSchema';
import { z } from 'zod';

const empruntService = new EmpruntService();

export const createEmpruntController = {
  createEmprunt: async (req: Request, res: Response) => {
    try {
      const parsed = empruntSchema.parse(req.body);
      const result = await empruntService.createEmprunt(parsed);
      res.status(201).json(result);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.flatten().fieldErrors });
      }
      res.status(500).json({ error: error.message });
    }
  },

  getAllEmprunts: async (req: Request, res: Response) => {
    const userId = req.query.utilisateur as string | undefined;
    const emprunts = await empruntService.getAllEmprunts(userId);
    res.status(200).json(emprunts);
  },

  getEmpruntById: async (req: Request, res: Response) => {
    const emprunt = await empruntService.getEmpruntById(req.params.id);
    if (!emprunt) return res.status(404).json({ message: 'Emprunt non trouvé' });
    res.status(200).json(emprunt);
  },

  returnEmprunt: async (req: Request, res: Response) => {
    try {
      const emprunt = await empruntService.returnEmprunt(req.params.id);
      res.status(200).json(emprunt);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteEmprunt: async (req: Request, res: Response) => {
    const success = await empruntService.deleteEmprunt(req.params.id);
    if (!success) return res.status(404).json({ message: 'Emprunt non trouvé' });
    res.status(200).json({ message: 'Emprunt supprimé' });
  }
};
