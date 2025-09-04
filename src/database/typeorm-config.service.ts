import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import configuration from '../config/configuration';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.config.database.type,
      url: this.config.database.url,
      host: this.config.database.host,
      port: this.config.database.port,
      username: this.config.database.username,
      password: this.config.database.password,
      database: this.config.database.name,
      synchronize: this.config.database.synchronize,
      dropSchema: false,
      keepConnectionAlive: true,
      logging:
        this.config.app.env !== 'production',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'migrations',
        subscribersDir: 'subscriber',
      },
      extra: {
        max: this.config.database.maxConnections,
        ssl: this.config.database.sslEnabled
          ? {
              rejectUnauthorized: this.config.database.rejectUnauthorized,
              ca: this.config.database.ca,
              key: this.config.database.key,
              cert: this.config.database.cert,
            }
          : undefined,
      },
    } as TypeOrmModuleOptions;
  }
}