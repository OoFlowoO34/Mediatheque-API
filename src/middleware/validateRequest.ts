import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { z } from 'zod';

export const validateRequest = <T extends AnyZodObject>(schema: T) =>
  async (req: Request<any, any, z.infer<T>>, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation échouée',
          errors: error.errors.map(err => ({
            champ: err.path.join('.'),
            message: err.message
          }))
        });
      }
      res.status(500).json({ message: 'Erreur lors de la validation' });
    }
  };