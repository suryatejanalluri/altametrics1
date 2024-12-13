import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for all origins
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests only from your frontend (React app)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
