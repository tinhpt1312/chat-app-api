import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ENV } from './env.config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: ENV.DATABASE.HOST,
  port: ENV.DATABASE.PORT,
  username: ENV.DATABASE.USER,
  password: ENV.DATABASE.PASS,
  database: ENV.DATABASE.DATA,
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  logging: true,
});

@Injectable()
export class PostgresConfiguration implements TypeOrmOptionsFactory {
  constructor() {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: ENV.DATABASE.HOST,
      port: ENV.DATABASE.PORT,
      username: ENV.DATABASE.USER,
      password: ENV.DATABASE.PASS,
      database: ENV.DATABASE.DATA,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      subscribers: [__dirname + '/../**/*.subscriber.{js,ts}'],
      synchronize: false,
      logging: true,
      logger: 'advanced-console',
    };
  }
}
