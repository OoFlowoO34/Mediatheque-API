import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { empruntCreateSchema, empruntUpdateSchema } from '../schemas/empruntSchema';
import { EmpruntService } from '../services/empruntService';
import { createEmpruntController } from '../controllers/empruntController';

const empruntService = new EmpruntService();
const empruntController = createEmpruntController(empruntService);

const router = Router();

// Route pour créer un nouvel emprunt
router.post('/', validateRequest(empruntCreateSchema), empruntController.createEmprunt);

// Route pour récupérer tous les emprunts
router.get('/', empruntController.getAllEmprunts);

// Route pour récupérer un emprunt spécifique
router.get('/:id', empruntController.getEmpruntById);

// Route pour marquer un emprunt comme retourné
router.put('/:id/return', validateRequest(empruntUpdateSchema), empruntController.returnEmprunt);

// Route pour supprimer un emprunt
router.delete('/:id', empruntController.deleteEmprunt);

export default router;