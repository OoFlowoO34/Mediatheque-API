import cors from 'cors';
import { DEVELOPMENT } from '../config/server';

// Configuration recommandée
export const corsHandler = cors({
  origin: DEVELOPMENT ? '*' : ['https://mediatheque.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});
