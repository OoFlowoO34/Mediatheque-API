

import { Response } from 'express';
import { AppError } from './appError';
import { ZodError } from 'zod';

export function handleError(res: Response, error: any) {
    if (error instanceof ZodError) {
        console.error(error);
        res.status(400).json({ errors: error.flatten().fieldErrors });
    } else if (error instanceof AppError) {
        console.error(error);
        res.status(error.statusCode).json({ message: error.message });
    } else {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}