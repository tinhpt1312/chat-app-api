import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from 'src/config/env.config';
import { User } from 'src/entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies';
import { AwsS3Module } from 'src/shared/aws-s3/aws-s3.module';
import { AwsS3Service } from 'src/shared/aws-s3/aws-s3.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: ENV.JWT.SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AwsS3Module,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    AwsS3Service,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
