import { Response } from 'express';
import { UserInput, UserUpdateInput } from '../schemas/userSchema';
import { RequestId, RequestIdAndBody, RequestBody } from '../types/requests';
import { IUserService } from '../interfaces/IUserService';

export const createUserController = (userService: IUserService) => ({
    createUser: async (req: RequestBody<UserInput>, res: Response): Promise<void> => {
        try {
            const savedUser = await userService.createUser(req.body);
            res.status(201).json(savedUser);
        } catch (error) {
            if (error instanceof Error && error.message === 'Un utilisateur avec cet email existe déjà') {
            res.status(400).json({ message: error.message });
            } else {
            res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
            }
        }
    },
    getAllUsers: async (_req: RequestBody<never>, res: Response): Promise<void> => {
        try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
        } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
        }
    },
    getUserById: async (req: RequestId, res: Response): Promise<void> => {
        try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }
        res.status(200).json(user);
        } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
        }
    }
    ,
    updateUser: async (req: RequestIdAndBody<UserUpdateInput>, res: Response): Promise<void> => {
        try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }
        res.status(200).json(updatedUser);
        } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
        }
    }
    ,
    deleteUser: async (req: RequestId, res: Response): Promise<void> => {
        try {
        const deleted = await userService.deleteUser(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
        }
    }   
});