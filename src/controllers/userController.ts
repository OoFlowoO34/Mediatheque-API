import { Request, Response } from 'express';
import User from '../models/User';

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nom, prenom, mail, telephone, nationalite } = req.body;
    
    // Validate required fields
    if (!nom || !prenom || !mail || !telephone || !nationalite) {
      res.status(400).json({ message: 'Tous les champs sont obligatoires' });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ mail });
    if (existingUser) {
      res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
      return;
    }

    const newUser = new User({
      nom,
      prenom,
      mail,
      telephone,
      nationalite
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
};

// Get all users
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nom, prenom, mail, telephone, nationalite } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { nom, prenom, mail, telephone, nationalite },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }
    
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
  }
};