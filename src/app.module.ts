import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios/usuario.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/usuario.entity'; 
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'; 

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Usuario],
        synchronize: true, // No recomendado en producción
        logging: true,
      }),
    ConfigModule.forRoot({
      isGlobal: true, // Asegúrate de que ConfigModule sea global
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Usuario de PostgreSQL
      password: 'Seguridad2024', // Contraseña de PostgreSQL
      database: 'postgres', // Nombre de la base de datos
      entities: [Usuario], // Asegúrate de incluir todas las entidades necesarias
      synchronize: true, // No recomendado en producción
      logging: true, // Opcional para depuración
    }),
    UsuariosModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
