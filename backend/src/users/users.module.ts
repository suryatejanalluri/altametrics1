// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';  // Import PrismaModule

@Module({
  imports: [PrismaModule],  // Add PrismaModule to imports
  providers: [UsersService],
  exports: [UsersService],  // Export UsersService so it can be used in other modules
  controllers: [UsersController],
})
export class UsersModule {}
