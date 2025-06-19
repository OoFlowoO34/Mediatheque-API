

import { Response } from 'express';
import { AppError } from './appError';
import { ZodError } from 'zod';
import logger from '../utils/logger/loggerHelper';

const log = logger('errorHandler');
export function handleError(res: Response, error: any) {
    if (error instanceof ZodError) {
        res.status(400).json({ errors: error.flatten().fieldErrors });
    } else if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}