import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigService

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Usuario],
        synchronize: true,
        logging: true,
      }),
    }),
    UsuarioModule,
    AutenticacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
