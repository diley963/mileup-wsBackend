//import * as dotenv from 'dotenv';
//dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Configuración de Swagger
    const config = new DocumentBuilder()
    .setTitle('API sistema mile up')
    .setDescription('apis para todos los servicios de el sistema de información mileUp')
    .setVersion('1.0')
    .addBearerAuth() // Si usas JWT, esto agrega soporte para el token en Swagger
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentacion', app, document);

    await app.listen(3000);

}

bootstrap();
