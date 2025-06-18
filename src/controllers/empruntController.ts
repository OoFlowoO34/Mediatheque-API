import { Response } from 'express';
import { EmpruntCreateZodType, EmpruntUpdateZodType } from '../schemas/empruntSchema';
import { RequestId, RequestIdAndBody, RequestBody } from '../types/requests';
import { IEmpruntService } from '../interfaces/IEmpruntService';
import { handleError } from '../utils/errorHandler';

export const createEmpruntController = (empruntService: IEmpruntService) => ({
  createEmprunt: async (req: RequestBody<EmpruntCreateZodType>, res: Response): Promise<void> => {
    try {
      const result = await empruntService.createEmprunt(req.body);
      res.status(201).json(result);
    } catch (error) {
      handleError(res, error);
    }
  },
  getAllEmprunts: async (_req: RequestBody<never>, res: Response): Promise<void> => {
    try {
      const emprunts = await empruntService.getAllEmprunts();
      res.status(200).json(emprunts);
    } catch (error) {
      handleError(res, error);
    }
  },
  getEmpruntById: async (req: RequestId, res: Response): Promise<void> => {
    try {
      const emprunt = await empruntService.getEmpruntById(req.params.id);
      res.status(200).json(emprunt);
    } catch (error) {
      handleError(res, error);
    }
  },
  returnEmprunt: async (req: RequestIdAndBody<EmpruntUpdateZodType>, res: Response): Promise<void> => {
    try {
      const emprunt = await empruntService.returnEmprunt(req.params.id);
      res.status(200).json(emprunt);
    } catch (error) {
      handleError(res, error);
    }
  },
  deleteEmprunt: async (req: RequestId, res: Response): Promise<void> => {
    try {
      await empruntService.deleteEmprunt(req.params.id);
      res.status(204).send();
    } catch (error) {
      handleError(res, error);
    }
  }
});