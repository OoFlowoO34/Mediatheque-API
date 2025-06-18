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
import { AppLogger } from '../interfaces/ILoggerService';

export const createRessourceController = (
  ressourceService: RessourceService,
  logger: AppLogger
) => ({
  getAllRessources: async (
    _req: RequestBody<any>,
    res: Response
  ): Promise<void> => {
    logger.info('Requesting All Ressources');
    try {
      const ressources = await ressourceService.getAllRessources();
      logger.info(`Ressource's length: ${ressources.length}`);
      res.status(200).json(ressources);
    } catch (error: any) {
      logger.error(`Get All Ressources Error: ${error.message}`);
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
    logger.info('Creating ressource');
    try {
      const parsed = ressourceSchema.parse(req.body);
      const result = await ressourceService.createRessource(parsed);
      logger.info('Ressource created successfuly');
      res.status(201).json(result);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        logger.warn("Invalid ressource's input");
        res.status(400).json({ errors: error.flatten().fieldErrors });
        return;
      }
      logger.error(`Create ressource Error: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  },

  getRessourceById: async (req: RequestId, res: Response): Promise<void> => {
    try {
      logger.info(`Getting ressource by ID: ${req.params.id}`);
      const ressource = await ressourceService.getRessourceById(req.params.id);
      if (!ressource) {
        logger.warn(`Ressource not found with ID: ${req.params.id}`);
        res.status(404).json({ error: 'Ressource non trouvée' });
        return;
      }
      logger.info(`Ressource found with ID: ${req.params.id}`);
      res.status(200).json(ressource);
    } catch (error: any) {
      logger.error(`Find Ressource by ID Error: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  },

  ressourceUpdate: async (
    req: RequestIdAndBody<RessourceUpdateInput>,
    res: Response
  ) => {
    try {
      logger.info(`Updating ressource with ID: ${req.params.id}`);
      const parsed = ressourceUpdateSchema.parse(req.body);
      const updated = await ressourceService.updateRessource(
        req.params.id,
        parsed
      );
      if (!updated) {
        logger.warn(`Ressource not found with ID: ${req.params.id}`);
        return res.status(404).json({ error: 'Ressource non trouvée' });
      }
      logger.info(`Ressource found with id: ${req.params.id}`);
      res.status(200).json(updated);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        logger.warn("Invalid ressource's input");
        return res.status(400).json({ errors: error.flatten().fieldErrors });
      }
      logger.error(`Update Ressource Error: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  },

  ressourceDelete: async (_req: RequestId, res: Response): Promise<void> => {
    logger.info(`Deleting ressource by ID: ${_req.params.id}`);
    const deleted = await ressourceService.deleteRessource(_req.params.id);
    if (!deleted) {
      logger.warn(`Ressource not found with ID: ${_req.params.id}`);
      res.status(404).json({ error: 'Ressource non trouvée' });
      return;
    }
    logger.info(`Ressource deleted with ID:: ${_req.params.id}`);
    res.status(204).send();
  },
});
