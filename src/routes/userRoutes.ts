import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { userCreateSchema, userUpdateSchema } from '../schemas/userSchema';
import { createUserService } from '../services/userService';
import { createUserController } from '../controllers/userController';
import logger from '../utils/logger/loggerHelper';

const userService = createUserService(logger('userService'));
const userController = createUserController(userService, logger('userController'));

const router = Router();

// Route to create a new user
router.post('/', validateRequest(userCreateSchema), userController.createUser);

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get a specific user
router.get('/:id', userController.getUserById);

// Route to update an existing user
router.put('/:id', validateRequest(userUpdateSchema), userController.updateUser);

// Route to delete a user
router.delete('/:id', userController.deleteUser);

export default router;