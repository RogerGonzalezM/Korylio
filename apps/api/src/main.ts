import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  const port = Number(
    process.env.API_PORT ?? process.env.PORT ?? 4000,
  );

  await app.listen(port, '0.0.0.0');
}

await bootstrap();