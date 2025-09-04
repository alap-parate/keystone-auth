import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import configuration from '../config/configuration';

const config = configuration();

export const AppDataSource = new DataSource({
  type: config.database.type as any,
  url: config.database.url,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: config.database.synchronize,
  dropSchema: false,
  logging: config.app.env !== 'production',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  extra: {
    max: config.database.maxConnections,
    ssl: config.database.sslEnabled
        ? {
            rejectUnauthorized: config.database.rejectUnauthorized,
            ca: config.database.ca ?? undefined,
            key: config.database.key ?? undefined,
            cert: config.database.cert ?? undefined,
          }
        : undefined,
  },
} as DataSourceOptions);