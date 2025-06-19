import { Response } from 'express';
import { UserCreateZodType, UserUpdateZodType } from '../schemas/userSchema';
import { RequestId, RequestIdAndBody, RequestBody } from '../types/requests';
import { IUserService } from '../interfaces/IUserService';
import { AppError } from '../utils/appError';
import { handleError } from '../utils/errorHandler';
import type { LogHelper }  from '../utils/logger/loggerHelper';

export const createUserController = (userService: IUserService, logger: LogHelper) => ({
    createUser: async (req: RequestBody<UserCreateZodType>, res: Response): Promise<void> => {
        try {
            const savedUser = await userService.createUser(req.body);
            res.status(201).json(savedUser);
            logger.info(`User created successfully with ID: ${savedUser.userId}`);
        } catch (error) {
            logger.error(`Error creating user: ${error}`);
            handleError(res, error);
        }
    },
    getAllUsers: async (_req: RequestBody<never>, res: Response): Promise<void> => {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
            logger.info(`Fetched ${users.length} users`);
        } catch (error) {
            logger.error(`Error fetching users: ${error}`);
            handleError(res, error);
        }
    },
    getUserById: async (req: RequestId, res: Response): Promise<void> => {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
            logger.info(`Fetched user with ID: ${req.params.id}`);
        } catch (error) {
            logger.error(`Error fetching user by ID ${req.params.id}: ${error}`);
            handleError(res, error);
        }
    },
    updateUser: async (req: RequestIdAndBody<UserUpdateZodType>, res: Response): Promise<void> => {
        try {
            const updatedUser = await userService.updateUser(req.params.id, req.body);
            res.status(200).json(updatedUser);
            logger.info(`User with ID: ${req.params.id} updated successfully`);
        } catch (error) {
            logger.error(`Error updating user with ID ${req.params.id}: ${error}`);
            handleError(res, error);
        }
    },
    deleteUser: async (req: RequestId, res: Response): Promise<void> => {
        try {
            // Vérifier si l'utilisateur a un emprunt en cours
            const hasActiveLoan = await userService.hasActiveLoan(req.params.id);
            if (hasActiveLoan) {
                logger.warn(`Attempt to delete user with ID: ${req.params.id} who has active loans`);
                res.status(400).json({ message: "Impossible de supprimer un utilisateur ayant un emprunt en cours." });
                return;
            }
            await userService.deleteUser(req.params.id);
            res.status(200).json({ message: "User successfully deleted" });
            logger.info(`User with ID: ${req.params.id} deleted successfully`);
        } catch (error) {
            logger.error(`Error deleting user with ID ${req.params.id}: ${error}`);
            handleError(res, error);
        }
    }
});