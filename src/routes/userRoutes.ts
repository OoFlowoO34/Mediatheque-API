import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { userSchema, userUpdateSchema } from '../schemas/userSchema';
import { UserService } from '../services/userService';
import { createUserController } from '../controllers/userController';
import logger from '../utils/logger/loggerUtils';

const userService = new UserService();
const userController = createUserController(userService, logger);

const router = Router();

// Route to create a new user
router.post('/', validateRequest(userSchema), userController.createUser);

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get a specific user
router.get('/:id', userController.getUserById);

// Route to update an existing user
router.put(
  '/:id',
  validateRequest(userUpdateSchema),
  userController.updateUser
);

// Route to delete a user
router.delete('/:id', userController.deleteUser);

export default router;
