// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

// Import and configure dotenv
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from './schemas/user.schema';
dotenv.config();

const SECRET = process.env.SECRET;

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: SECRET, // Uses the constant
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
})
export class AuthModule {}
