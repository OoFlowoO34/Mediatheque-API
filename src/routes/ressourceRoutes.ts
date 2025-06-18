import { RessourceService } from './../services/ressourceService';
import { Router } from 'express';
import { createRessourceController } from '../controllers/ressourceController';
import { validateRequest } from '../middleware/validateRequest';
import {
  ressourceCreateSchema,
  ressourceUpdateSchema,
} from '../schemas/ressourceSchema';

const ressourceService = new RessourceService();
const ressourceController = createRessourceController(ressourceService);
const router = Router();

// Récupérer toutes les ressources
router.get('/', ressourceController.getAllRessources);

// Créer une ressource
router.post(
  '/',
  validateRequest(ressourceCreateSchema),
  ressourceController.createRessource
);

// Récupérer une ressource depuis son ID
router.get('/:id', ressourceController.getRessourceById);

// Mettre à jour une ressource
router.put(
  '/:id',
  validateRequest(ressourceUpdateSchema),
  ressourceController.ressourceUpdate
);

// Effacer une ressource
router.delete('/:id', ressourceController.ressourceDelete);

export default router;
