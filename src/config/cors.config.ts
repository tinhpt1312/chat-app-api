import { INestApplication } from '@nestjs/common';
import { ENV } from './env.config';

export const setopCors = (app: INestApplication) => {
  app.enableCors({
    origin: ENV.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
};
