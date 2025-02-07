// filepath: /Users/admin/Documents/ts-node-express-scrape-web/ormconfig.ts
import { DataSource } from 'typeorm';
import { LottoResult } from '../entities/LottoResult.entity';
import config from '../config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.db_username,
  password: config.db.db_password,
  database: config.db.db_name,
  synchronize: true,
  logging: false,
  entities: [LottoResult],
  migrations: [],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false
  }
});