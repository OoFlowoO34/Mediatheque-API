import { Request, Response } from 'express';
import { empruntSchema } from '../schemas/empruntSchema';
import { z } from 'zod';
import { IEmpruntService } from '../interfaces/IEmpruntService';

export const createEmpruntController = (empruntService: IEmpruntService) => ({
  createEmprunt: async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = empruntSchema.parse(req.body);
      const result = await empruntService.createEmprunt(parsed);
      res.status(201).json(result);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.flatten().fieldErrors });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  },

  getAllEmprunts: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.query.utilisateur as string | undefined;
      const emprunts = await empruntService.getAllEmprunts(userId);
      res.status(200).json(emprunts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getEmpruntById: async (req: Request, res: Response): Promise<void> => {
    try {
      const emprunt = await empruntService.getEmpruntById(req.params.id);
      if (!emprunt) {
        res.status(404).json({ message: 'Emprunt non trouvé' });
        return;
      }
      res.status(200).json(emprunt);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  returnEmprunt: async (req: Request, res: Response): Promise<void> => {
    try {
      const emprunt = await empruntService.returnEmprunt(req.params.id);
      res.status(200).json(emprunt);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteEmprunt: async (req: Request, res: Response): Promise<void> => {
    try {
      const success = await empruntService.deleteEmprunt(req.params.id);
      if (!success) {
        res.status(404).json({ message: 'Emprunt non trouvé' });
        return;
      }
      res.status(200).json({ message: 'Emprunt supprimé' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
});