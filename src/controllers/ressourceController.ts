import {
  ressourceSchema,
  ressourceUpdateSchema,
} from './../schemas/ressourceSchema';
import { RequestId, RequestIdAndBody, RequestBody } from '../types/requests';
import { Response } from 'express';
import { RessourceService } from '../services/ressourceService';
import {
  RessourceInput,
  RessourceUpdateInput,
} from '../schemas/ressourceSchema';

export const createRessourceController = (
  ressourceService: RessourceService
) => ({
  getAllRessources: async (
    _req: RequestBody<any>,
    res: Response
  ): Promise<void> => {
    try {
      const ressources = await ressourceService.getAllRessources();
      res.status(200).json(ressources);
    } catch (error) {
      res.status(500).json({
        message: 'Erreur lors de la récupération de la ressource',
        error,
      });
    }
  },

  createRessource: async (
    req: RequestBody<RessourceInput>,
    res: Response
  ): Promise<void> => {
    try {
      const parsed = ressourceSchema.parse(req.body);
      const result = await ressourceService.createRessource(parsed);
      res.status(201).json(result);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ errors: error.flatten().fieldErrors });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  },

  getRessourceById: async (req: RequestId, res: Response): Promise<void> => {
    try {
      const ressource = await ressourceService.getRessourceById(req.params.id);
      if (!ressource) {
        res.status(404).json({ error: 'Ressource non trouvée' });
        return;
      }
      res.status(200).json(ressource);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  ressourceUpdate: async (
    req: RequestIdAndBody<RessourceUpdateInput>,
    res: Response
  ) => {
    try {
      const parsed = ressourceUpdateSchema.parse(req.body);
      const updated = await ressourceService.updateRessource(
        req.params.id,
        parsed
      );
      if (!updated) {
        return res.status(404).json({ error: 'Ressource non trouvée' });
      }
      res.status(200).json(updated);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ errors: error.flatten().fieldErrors });
      }
      res.status(500).json({ error: error.message });
    }
  },

  ressourceDelete: async (_req: RequestId, res: Response): Promise<void> => {
    const deleted = await ressourceService.deleteRessource(_req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Ressource non trouvée' });
      return;
    }
    res.status(204).send();
  },
});
