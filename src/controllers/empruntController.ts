import { Response } from 'express';
import { EmpruntCreateZodType, EmpruntUpdateZodType } from '../schemas/empruntSchema';
import { RequestId, RequestIdAndBody, RequestBody } from '../types/requests';
import { IEmpruntService } from '../interfaces/IEmpruntService';
import { handleError } from '../utils/errorHandler';
import type { LogHelper }  from '../utils/logger/loggerHelper';

export const createEmpruntController = (empruntService: IEmpruntService,  logger: LogHelper
) => {
  return{
    createEmprunt: async (req: RequestBody<EmpruntCreateZodType>, res: Response): Promise<void> => {
      try {
        const result = await empruntService.createEmprunt(req.body);
        res.status(201).json(result);
        logger.info(`Emprunt created successfully with ID: ${result.empruntId}`);
      } catch (error) {
        logger.error(`Error creating emprunt: ${error}`);
        handleError(res, error);
      }
    },
    getAllEmprunts: async (_req: RequestBody<never>, res: Response): Promise<void> => {
      try {
        const emprunts = await empruntService.getAllEmprunts();
        res.status(200).json(emprunts);
        logger.info(`Fetched ${emprunts.length} emprunts`);
      } catch (error) {
        logger.error(`Error fetching emprunts: ${error}`);
        handleError(res, error);
      }
    },
    getEmpruntById: async (req: RequestId, res: Response): Promise<void> => {
      try {
        const emprunt = await empruntService.getEmpruntById(req.params.id);
        res.status(200).json(emprunt);
        logger.info(`Fetched emprunt with ID: ${req.params.id}`);
      } catch (error) {
        logger.error(`Error fetching emprunt by ID ${req.params.id}: ${error}`);
        handleError(res, error);
      }
    },
    returnEmprunt: async (req: RequestIdAndBody<EmpruntUpdateZodType>, res: Response): Promise<void> => {
      try {
        const emprunt = await empruntService.returnEmprunt(req.params.id);
        res.status(200).json(emprunt);
        logger.info(`Emprunt with ID: ${req.params.id} returned successfully`);
      } catch (error) {
        logger.error(`Error returning emprunt with ID ${req.params.id}: ${error}`);
        handleError(res, error);
      }
    },
    deleteEmprunt: async (req: RequestId, res: Response): Promise<void> => {
      try {
        await empruntService.deleteEmprunt(req.params.id);
        res.status(204).send();
        logger.info(`Emprunt with ID: ${req.params.id} deleted successfully`);
      } catch (error) {
        logger.error(`Error deleting emprunt with ID ${req.params.id}: ${error}`);
        handleError(res, error);
      }
    }
  }
};