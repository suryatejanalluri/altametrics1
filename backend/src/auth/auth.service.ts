import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Validate user credentials
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    console.log("password,user.password, value",password,user.password,bcrypt.compare(password, user.password));
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  // Login and return JWT token
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'your-fallback-secret-key',
        expiresIn: '10m', // Token expires in 10 minutesr
      })
      //this.jwtService.sign(payload),
    };
  }
}
