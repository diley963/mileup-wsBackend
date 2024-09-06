import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/usuario.entity'; // Asegúrate de que la ruta sea correcta

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
