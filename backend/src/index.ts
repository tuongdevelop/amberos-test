import express from 'express';
import cors from 'cors';
import "reflect-metadata";
import { appConfig } from './config/app.config';
import { AppDataSource } from './config/database.config';
import userRoutes from './api/user.routes';

const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get('/api/v1', (req, res) => res.send('HR Portal API is running!'));
    app.use('/api/v1', userRoutes); // All user routes under /api/v1

    app.listen(appConfig.port, () => {
      console.log(`Server is listening on port ${appConfig.port}`);
    });
  } catch (error) {
    console.error("Error during app initialization", error);
    process.exit(1);
  }
};
main();
