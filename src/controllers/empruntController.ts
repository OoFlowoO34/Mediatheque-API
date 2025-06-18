import { Response } from 'express';
import { EmpruntInput, EmpruntUpdateInput } from '../schemas/empruntSchema';
import { RequestId, RequestIdAndBody, RequestBody } from '../types/requests';
import { IEmpruntService } from '../interfaces/IEmpruntService';
import { AppLogger } from '../interfaces/ILoggerService';

export const createEmpruntController = (
  empruntService: IEmpruntService,
  logger: AppLogger
) => ({
  createEmprunt: async (
    req: RequestBody<EmpruntInput>,
    res: Response
  ): Promise<void> => {
    try {
      logger.info('Creating operation');
      const result = await empruntService.createEmprunt(req.body);
      logger.info('Operation done successfuly');
      res.status(201).json(result);
    } catch (error: any) {
      if (
        error instanceof Error &&
        error.message === 'Ressource non disponible'
      ) {
        logger.error(`Operation Error: ${error.message}`);
        res.status(400).json({ message: error.message });
      } else {
        logger.error(`Operation Error: ${error.message}`);
        res
          .status(500)
          .json({ message: "Erreur lors de la création de l'emprunt", error });
      }
    }
  },
  getAllEmprunts: async (req: RequestId, res: Response): Promise<void> => {
    logger.info('Requesting All Operation');
    try {
      const emprunts = await empruntService.getAllEmprunts(req.params.id);
      logger.info('Operation found successfuly');
      res.status(200).json(emprunts);
    } catch (error: any) {
      logger.error(`Operation Error: ${error.message}`);
      res.status(500).json({
        message: 'Erreur lors de la récupération des emprunts',
        error,
      });
    }
  },
  getEmpruntById: async (req: RequestId, res: Response): Promise<void> => {
    logger.info(`Getting operation by ID: ${req.params.id}`);
    try {
      const emprunt = await empruntService.getEmpruntById(req.params.id);
      if (!emprunt) {
        logger.warn(`Operation not found with ID: ${req.params.id}`);
        res.status(404).json({ message: 'Emprunt non trouvé' });
        return;
      }
      logger.info(`Operation found with ID: ${req.params.id}`);
      res.status(200).json(emprunt);
    } catch (error: any) {
      logger.error(`Operation Error: ${error.message}`);
      res.status(500).json({
        message: "Erreur lors de la récupération de l'emprunt",
        error,
      });
    }
  },

  returnEmprunt: async (
    req: RequestIdAndBody<EmpruntUpdateInput>,
    res: Response
  ): Promise<void> => {
    logger.info('Creating ressource');
    try {
      const emprunt = await empruntService.returnEmprunt(req.params.id);
      if (!emprunt) {
        logger.warn(`Operation not found with ID: ${req.params.id}`);
        res.status(404).json({ message: 'Emprunt non trouvé' });
        return;
      }
      logger.info(`Operation found with ID: ${req.params.id}`);
      res.status(200).json(emprunt);
    } catch (error: any) {
      logger.error(`Operation Error: ${error.message}`);
      res
        .status(400)
        .json({ message: "Erreur lors du retour de l'emprunt", error });
    }
  },

  deleteEmprunt: async (req: RequestId, res: Response): Promise<void> => {
    logger.info(`Deleting operation with ID: ${req.params.id}`);

    try {
      const success = await empruntService.deleteEmprunt(req.params.id);
      if (!success) {
        logger.warn(`Operation not found with ID: ${req.params.id}`);
        res.status(404).json({ message: 'Emprunt non trouvé' });
        return;
      }
      logger.info(`Operation deleted with ID: ${req.params.id}`);
      res.status(200).json({ message: 'Emprunt supprimé avec succès' });
    } catch (error: any) {
      logger.error(`Operation Error: ${error.message}`);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression de l'emprunt", error });
    }
  },
});
