import { Response } from 'express';
import { UserCreateZodType, UserUpdateZodType } from '../schemas/userSchema';
import { RequestId, RequestIdAndBody, RequestBody } from '../types/requests';
import { IUserService } from '../interfaces/IUserService';
import { AppError } from '../utils/appError';
import { handleError } from '../utils/errorHandler';

export const createUserController = (userService: IUserService) => ({
    createUser: async (req: RequestBody<UserCreateZodType>, res: Response): Promise<void> => {
        try {
            const savedUser = await userService.createUser(req.body);
            res.status(201).json(savedUser);
        } catch (error) {
            handleError(res, error);
        }
},
    getAllUsers: async (_req: RequestBody<never>, res: Response): Promise<void> => {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            handleError(res, error);
        }
    },
    getUserById: async (req: RequestId, res: Response): Promise<void> => {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            handleError(res, error);
        }
    },
    updateUser: async (req: RequestIdAndBody<UserUpdateZodType>, res: Response): Promise<void> => {
        try {
            const updatedUser = await userService.updateUser(req.params.id, req.body);
            res.status(200).json(updatedUser);
        } catch (error) {
            handleError(res, error);
        }
    },
    deleteUser: async (req: RequestId, res: Response): Promise<void> => {
        try {
            await userService.deleteUser(req.params.id);
            res.status(200).json({ message: "User successfully deleted" });
        } catch (error) {
            handleError(res, error);
        }
    }

});