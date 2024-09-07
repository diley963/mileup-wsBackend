import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/usuario.entity'; 
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'; 

@Module({
  imports: [
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
