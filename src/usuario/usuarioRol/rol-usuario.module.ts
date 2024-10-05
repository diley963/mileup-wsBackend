import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolUsuarioService } from './rol-usuario.service';
import { RolUsuarioController } from './rol-usuario.controller';
import { RolUsuario } from './rolUsuario.entity';
import { Usuario } from '../usuario.entity';
import { Rol } from '../rol/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolUsuario, Usuario, Rol])],
  controllers: [RolUsuarioController],
  providers: [RolUsuarioService],
})
export class RolUsuarioModule {}
