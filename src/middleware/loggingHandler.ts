import {Request, Response, NextFunction} from 'express';

export const loggingHandler = (req: Request, res: Response, next: NextFunction): void => {
    const startTime = Date.now();
    
    // Log the request details
    console.log(`Incomming - METHOD: [${req.method}] - URL: [${req.originalUrl}] - IP: [${req.ip}]`);
    
    // Call the next middleware or route handler
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`Response status: ${res.statusCode} - Duration: ${duration}ms`);
    });
    
    next();
};