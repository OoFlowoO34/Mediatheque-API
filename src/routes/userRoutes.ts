import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { userCreateSchema, userUpdateSchema } from '../schemas/userSchema';
import { UserService } from '../services/userService';
import { createUserController } from '../controllers/userController';

const userService = new UserService();
const userController = createUserController(userService);

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