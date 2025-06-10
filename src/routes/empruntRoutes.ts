import { Router } from 'express';
import { createEmpruntController } from '../controllers/empruntController';

const router = Router();

router.post('/', createEmpruntController.createEmprunt);
router.get('/', createEmpruntController.getAllEmprunts);
router.get('/:id', createEmpruntController.getEmpruntById);
router.put('/:id/return', createEmpruntController.returnEmprunt);
router.delete('/:id', createEmpruntController.deleteEmprunt);

export default router;
