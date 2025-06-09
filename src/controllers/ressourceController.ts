import { Request, Response } from 'express';
import Ressource from '../models/Ressource';

// Get All Ressources
export const getAllRessources = async (req: Request, res: Response) => {
  try {
    const ressources = await Ressource.find();
    res.status(200).json(ressources);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur s'est produite", error: error });
  }
};

// Create Ressource
export const createRessource = async (req: Request, res: Response) => {
  try {
    const { titre, type, auteur } = req.body;
    const TYPES_ENUM = ['Livre', 'Jeu', 'Film', 'Autre'];

    if (!titre || !type || !auteur) {
      res
        .status(400)
        .json({ message: 'Les champs indiqués sont obligatoires' });
    }

    if (!TYPES_ENUM.includes(req.body.type)) {
      return res.status(400).json({
        message: `Le type doit être l'un des suivants : ${TYPES_ENUM.join(
          ', '
        )}`,
      });
    }

    const newRessource = await Ressource.create(req.body);
    res.status(200).json(newRessource);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir une ressource par ID
export const getRessourceById = async (req: Request, res: Response) => {
  try {
    const ressource = await Ressource.findById(req.params.id);
    if (!ressource)
      return res.status(404).json({ message: 'Ressource non trouvée' });
    res.status(200).json(ressource);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une ressource
export const updateRessource = async (req: Request, res: Response) => {
  try {
    console.log('TEST', req.params.id);
    const updated = await Ressource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: 'Ressource non trouvée' });
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une ressource
export const deleteRessource = async (req: Request, res: Response) => {
  try {
    const deleted = await Ressource.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: 'Ressource non trouvée' });
    res.status(200).json({ message: 'Ressource supprimée avec succès' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
