import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importar las entidades
import { Usuario } from './usuario/usuario.entity';
import { Rol } from './usuario/rol/rol.entity';
import { RolUsuario } from './usuario/usuarioRol/rolUsuario.entity';
import { Comercio } from './comercio/comercio.entity';
import { TipoComercio } from './tipoComercio/tipo-comercio.entity';
import { InformacionContacto } from './informacionContacto/informacionContacto.entity';
import { TipoInformacionContacto } from './tipoInformacionContacto/TipoInformacionContacto.entity';
import { Producto } from './producto/producto.entity';
import { Pais } from './lugaresGeograficos/pais.entity';
import { Departamento } from './lugaresGeograficos/departamento.entity';
import { Ciudad } from './lugaresGeograficos/ciudad.entity';
import { Categoria } from './producto/categoria.entity';

// Importar los módulos
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './usuario/rol/rol.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { ComercioModule } from './comercio/comercio.module';
import { TipoComercioModule } from './tipoComercio/tipo-comercio.module';
import { TipoInformacionContactoModule } from './tipoInformacionContacto/tipo-informacioncontacto.module';
import { InformacionContactoModule } from './informacionContacto/informacion-contacto.module';
import { ProductoModule } from './producto/producto.module';
import { CiudadModule } from './lugaresGeograficos/ciudad.module';
import { CategoriaModule } from './producto/categoria.module';


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
        entities: [
          Usuario, 
          RolUsuario, 
          Rol, 
          Comercio, 
          TipoComercio, 
          InformacionContacto, 
          TipoInformacionContacto,
          Producto,
          Pais,
          Departamento,
          Ciudad,
          Categoria
        ],
        synchronize: true,
        logging: true,
         // Manejo de SSL con variables de entorno
        ssl: configService.get<string>('DATABASE_SSL') === 'true' ? { rejectUnauthorized: false } : false,
    
      }),
    }),

    TypeOrmModule.forFeature([Usuario, RolUsuario, Rol, Comercio, TipoComercio, InformacionContacto, TipoInformacionContacto,Producto, Categoria]),
    UsuarioModule,
    RolModule,
    AutenticacionModule, 
    ComercioModule,
    TipoComercioModule,
    TipoInformacionContactoModule,
    InformacionContactoModule,
    ProductoModule,
    CiudadModule,
    CategoriaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
