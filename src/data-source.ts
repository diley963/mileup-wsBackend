import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno del archivo .env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST, // Variable de entorno
  port: parseInt(process.env.DATABASE_PORT, 10), // Variable de entorno
  username: process.env.DATABASE_USER, // Variable de entorno
  password: process.env.DATABASE_PASSWORD, // Variable de entorno
  database: process.env.DATABASE_NAME, // Variable de entorno
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false, // Ajuste de SSL
  },
  logging: ['query', 'error', 'schema'],
});
