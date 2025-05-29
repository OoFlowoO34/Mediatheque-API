import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

// Route to create a new user
router.post('/', userController.createUser);

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get a specific user
router.get('/:id', userController.getUserById);

// Route to update an existing user
router.put('/:id', userController.updateUser);

// Route to delete a user
router.delete('/:id', userController.deleteUser);

export default router;