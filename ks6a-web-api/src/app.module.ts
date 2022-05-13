import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from '@cfg/configuration';
import { HttpErrorFilter } from '@src/core/http-error.filter';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { entities } from '@src/orm';
import { ProjectModule } from '@src/project/project.module';
import { ObjectEstimateModule } from '@src/object-estimate/object-estimate.module';
import { EstimateModule } from '@src/estimate/estimate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get('db').pg.type,
        host: config.get('db').pg.host,
        port: config.get('db').pg.port,
        username: config.get('db').pg.username,
        password: config.get('db').pg.password,
        database: config.get('db').pg.database,
        synchronize: config.get('db').pg.synchronize,
        entities,
        extra: {
          max: 10,
          connectionTimeoutMillis: 1000,
        },
        logging: ['warn', 'error'],
      }),
    }),
    ProjectModule,
    ObjectEstimateModule,
    EstimateModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
