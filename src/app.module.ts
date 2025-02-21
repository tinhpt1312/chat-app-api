import { Module } from '@nestjs/common';
import { ChatModule } from './modules/chat/chat.module';
import { PostgresConfiguration } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { AwsS3Module } from './shared/aws-s3/aws-s3.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfiguration,
    }),
    ChatModule,
    AuthModule,
    AwsS3Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
