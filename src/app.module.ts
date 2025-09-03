import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { SessionModule } from './session/session.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import databaseConfig from './database/config/database.config';
import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

const DatabaseModule = 
  TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    });
    
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [
        appConfig,
        databaseConfig,
      ],
    }),
    DatabaseModule,
    AuthModule, 
    UserModule, 
    RoleModule, 
    PermissionModule, 
    SessionModule, 
    MailModule
  ],
})
export class AppModule {}
