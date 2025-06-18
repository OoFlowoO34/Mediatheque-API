import {
  ressourceSchema,
  ressourceUpdateSchema,
} from './../schemas/ressourceSchema';
import { RequestId, RequestIdAndBody, RequestBody } from '../types/requests';
import { Response } from 'express';
import { RessourceService } from '../services/ressourceService';
import {
  RessourceCreateZodType,
  RessourceUpdateZodType,
} from '../schemas/ressourceSchema';
import { AppError } from '../utils/appError';
import { handleError } from '../utils/errorHandler';

export const createRessourceController = (
  ressourceService: RessourceService
) => ({
    createRessource: async (
    req: RequestBody<RessourceCreateZodType>,
    res: Response
  ): Promise<void> => {
    try {
      const result = await ressourceService.createRessource(req.body);
      res.status(201).json(result);
    } catch (error) {
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
    } catch (error) {
        handleError(res, error);
    }
  },
  getRessourceById: async (req: RequestId, res: Response): Promise<void> => {
    try {
      const ressource = await ressourceService.getRessourceById(req.params.id);
      if (!ressource) {
        throw new AppError('Resource not found', 404);
      }
      res.status(200).json(ressource);
    } catch (error) {
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
      if (!updated) {
        throw new AppError('Resource not found', 404);
      }
      res.status(200).json(updated);
    } catch (error: any) {
      handleError(res, error);
    }
  },

  ressourceDelete: async (_req: RequestId, res: Response): Promise<void> => {
    try {
        await ressourceService.deleteRessource(_req.params.id);
        res.status(200).json({ message: "Resource successfully deleted" });
    } catch (error) {
        handleError(res, error);
    }
  },
});
