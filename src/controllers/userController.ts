import { Response } from 'express';
import { UserInput, UserUpdateInput } from '../schemas/userSchema';
import { RequestId, RequestIdAndBody, RequestBody } from '../types/requests';
import { IUserService } from '../interfaces/IUserService';
import { AppLogger } from '../interfaces/ILoggerService';

export const createUserController = (
  userService: IUserService,
  logger: AppLogger
) => ({
  createUser: async (
    req: RequestBody<UserInput>,
    res: Response
  ): Promise<void> => {
    logger.info('Creating user');
    try {
      const savedUser = await userService.createUser(req.body);
      logger.info('User created successfuly');
      res.status(201).json(savedUser);
    } catch (error: any) {
      if (
        error instanceof Error &&
        error.message === 'Un utilisateur avec cet email existe déjà'
      ) {
        logger.warn('Invalid Input : Email already used');
        res.status(400).json({ message: error.message });
      } else {
        logger.error(`Create user Error: ${error.message}`);
        res.status(500).json({
          message: "Erreur lors de la création de l'utilisateur",
          error,
        });
      }
    }
  },
  getAllUsers: async (
    _req: RequestBody<never>,
    res: Response
  ): Promise<void> => {
    logger.info('Requesting all users');
    try {
      const users = await userService.getAllUsers();
      logger.info(`All users found`);
      res.status(200).json(users);
    } catch (error: any) {
      logger.error(`Get all users Error: ${error.message}`);
      res.status(500).json({
        message: 'Erreur lors de la récupération des utilisateurs',
        error,
      });
    }
  },
  getUserById: async (req: RequestId, res: Response): Promise<void> => {
    try {
      logger.info(`Getting user by ID: ${req.params.id}`);
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        logger.warn(`User not found with ID: ${req.params.id}`);
        res.status(404).json({ message: 'Utilisateur non trouvé' });
        return;
      }
      logger.warn(`User found with ID: ${req.params.id}`);
      res.status(200).json(user);
    } catch (error: any) {
      logger.error(`Get user Error: ${error.message}`);
      res.status(500).json({
        message: "Erreur lors de la récupération de l'utilisateur",
        error,
      });
    }
  },
  updateUser: async (
    req: RequestIdAndBody<UserUpdateInput>,
    res: Response
  ): Promise<void> => {
    try {
      logger.info(`Updating user with ID: ${req.params.id}`);
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        logger.warn(`User not found with ID: ${req.params.id}`);
        res.status(404).json({ message: 'Utilisateur non trouvé' });
        return;
      }
      logger.info(`User updated with ID: ${req.params.id}`);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      logger.error(`Update user Error: ${error.message}`);
      res.status(500).json({
        message: "Erreur lors de la mise à jour de l'utilisateur",
        error,
      });
    }
  },
  deleteUser: async (req: RequestId, res: Response): Promise<void> => {
    logger.info(`Deleting user with ID: ${req.params.id}`);
    try {
      const deleted = await userService.deleteUser(req.params.id);
      if (!deleted) {
        logger.warn(`User not found with ID: ${req.params.id}`);
        res.status(404).json({ message: 'Utilisateur non trouvé' });
        return;
      }
      logger.info(`User deleted succefully with ID: ${req.params.id}`);
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error: any) {
      logger.error(`Create user Error: ${error.message}`);
      res.status(500).json({
        message: "Erreur lors de la suppression de l'utilisateur",
        error,
      });
    }
  },
});
