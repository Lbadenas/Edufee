import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swaggerConfig';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 3005;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: ['http://localhost:3005', 'https://edufee.vercel.app/'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
  });
  await app.listen(PORT);
  console.log(`Server listening on http:localhost:${PORT}`);
}
bootstrap();
