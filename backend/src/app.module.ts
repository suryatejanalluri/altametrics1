import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PrismaController } from './prisma/prisma.controller';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule,InvoicesModule, PrismaModule, UsersModule],
  controllers: [AppController, PrismaController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
