import express from 'express';
import connectDB from './config/database';
import { SERVER } from './config/server';
import { DEVELOPMENT } from './config/server';
import { setupRoutes } from './routes/routes';
import { setupMiddlewares } from './middleware/middlewares';

const app = express();

// Setup Middlewares
setupMiddlewares(app);

// Connect to MongoDB
connectDB();

// Setup routes
setupRoutes(app);


app.listen(SERVER.port, SERVER.hostname, () => {
// Log the environment when the server starts
    console.log(`Server running on ${SERVER.hostname}:${SERVER.port} in ${DEVELOPMENT ? 'DEVELOPMENT' : 'PRODUCTION'} mode`);
}).on("error", (error) => {
    throw new Error(error.message);
});