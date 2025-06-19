import {
  ressourceUpdateSchema,
} from './../schemas/ressourceSchema';
import { RequestId, RequestIdAndBody, RequestBody } from '../types/requests';
import { Response } from 'express';
import { IRessourceService } from '../interfaces/IRessourceService';
import {
  RessourceCreateZodType,
  RessourceUpdateZodType,
} from '../schemas/ressourceSchema';
import { handleError } from '../utils/errorHandler';
import type { LogHelper }  from '../utils/logger/loggerHelper';

export const createRessourceController = (
  ressourceService: IRessourceService, logger:LogHelper
) => ({
    createRessource: async (
    req: RequestBody<RessourceCreateZodType>,
    res: Response
  ): Promise<void> => {
    try {
      const result = await ressourceService.createRessource(req.body);
      res.status(201).json(result);
      logger.info(`Resource created successfully with ID: ${result.ressourceId}`);
    } catch (error) {
        logger.error(`Error creating resource: ${error}`);
        handleError(res, error);
    }
  },
    getAllRessources: async (
    _req: RequestBody<never>,
    res: Response
  ): Promise<void> => {
    try {
      const ressources = await ressourceService.getAllRessources();
      res.status(200).json(ressources);
      logger.info(`Fetched ${ressources.length} resources`);
    } catch (error) {
        logger.error(`Error fetching resources: ${error}`);
        handleError(res, error);
    }
  },
  getRessourceById: async (req: RequestId, res: Response): Promise<void> => {
    try {
      const ressource = await ressourceService.getRessourceById(req.params.id);
      res.status(200).json(ressource);
      logger.info(`Fetched resource with ID: ${req.params.id}`);
    } catch (error) {
        logger.error(`Error fetching resource by ID ${req.params.id}: ${error}`);
        handleError(res, error);
    }
  },

  ressourceUpdate: async (
    req: RequestIdAndBody<RessourceUpdateZodType>,
    res: Response
  ) => {
    try {
      const parsed = ressourceUpdateSchema.parse(req.body);
      const updated = await ressourceService.updateRessource(
        req.params.id,
        parsed
      );
      res.status(200).json(updated);
      logger.info(`Resource with ID: ${req.params.id} updated successfully`);
    } catch (error: any) {
      logger.error(`Error updating resource with ID ${req.params.id}: ${error}`);
      handleError(res, error);
    }
  },

  ressourceDelete: async (_req: RequestId, res: Response): Promise<void> => {
    try {
        await ressourceService.deleteRessource(_req.params.id);
        res.status(200).json({ message: "Resource successfully deleted" });
        logger.info(`Resource with ID: ${_req.params.id} deleted successfully`);
    } catch (error) {
        logger.error(`Error deleting resource with ID ${_req.params.id}: ${error}`);
        handleError(res, error);
    }
  },
});
