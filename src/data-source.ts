import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'meubanco',
  entities: ['dist/**/*.entity.js'],      // vamos rodar migrations em cima do dist
  migrations: ['dist/migrations/*.js'],
});

export default AppDataSource;