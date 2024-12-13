
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],  // This allows PrismaService to be used in other modules
})
export class PrismaModule {}
