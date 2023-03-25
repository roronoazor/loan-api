import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
})
export class AuthModule {}
