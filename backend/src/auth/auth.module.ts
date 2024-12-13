import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersModule } from '../users/users.module'; // Import Users module

@Module({
  imports: [JwtModule.register({ secret: 'your-secret-key', signOptions: { expiresIn: '60m' } }), UsersModule],  // JwtModule and UsersModule
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}