import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { RolUsuario } from './usuarioRol/rolUsuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(RolUsuario)
    private rolUsuarioRepository: Repository<RolUsuario>,
  ) {}

  async crear(crearUsuarioDto: CrearUsuarioDto): Promise<Usuario> {
    // Aquí podrías agregar validaciones para crearUsuarioDto
    const nuevoUsuario = this.usuarioRepository.create(crearUsuarioDto);
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async obtenerTodos(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      relations: ['rolUsuarios', 'rolUsuarios.rol'], // Asegúrate de incluir las relaciones correctas
    });
  }
  

  async obtenerUno(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ 
      where: { id },
      relations: ['rolUsuarios', 'rolUsuarios.rol'],
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }


  async obtenerPorCorreo(correo_electronico: string): Promise<Usuario> {
    return this.usuarioRepository.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.rolUsuarios', 'rolUsuario')
      .leftJoinAndSelect('rolUsuario.rol', 'rol')
      .where('usuario.correo_electronico = :correo_electronico', { correo_electronico })
      .getOne();
  }

  async actualizar(
    id: string,
    actualizarUsuario: Partial<Usuario>,
  ): Promise<Usuario> {
    const usuario = await this.obtenerUno(id); // Verifica si existe antes de actualizar
    await this.usuarioRepository.update(id, actualizarUsuario);
    return { ...usuario, ...actualizarUsuario }; // Retorna el usuario actualizado
  }

  // Eliminar un usuario
  async eliminar(id: string): Promise<void> {
    const usuario = await this.obtenerUno(id); // Verifica si existe antes de eliminar
    await this.usuarioRepository.delete(id);
  }
}