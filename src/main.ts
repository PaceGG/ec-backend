import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = 4001;

  app.setGlobalPrefix('api');

  // Конфигурация Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS Prisma Tutorial')
    .setDescription('Документация API для учебного проекта')
    .setVersion('1.0')
    .build();

  // Генерация OpenAPI документа
  const document = SwaggerModule.createDocument(app, config);

  // Сохраняем swagger.json в корень проекта
  writeFileSync(
    join(process.cwd(), 'swagger.json'),
    JSON.stringify(document, null, 2),
  );

  // Подключаем Swagger UI по адресу /api
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Server started at http://localhost:${4001}`);
  console.log(`Swagger UI available at http://localhost:${4001}/api`);
}

bootstrap();
