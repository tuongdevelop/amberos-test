import { DataSource } from "typeorm";
import 'dotenv/config';
import { User } from "../database/entities/User.entity";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, // DEV only
    logging: false,
    entities: [User],
});
