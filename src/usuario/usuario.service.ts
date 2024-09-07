import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async crear(crearUsuarioDto: CrearUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(crearUsuarioDto);
    return this.usuarioRepository.save(nuevoUsuario);
  }

  obtenerTodos(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  obtenerUno(id: string): Promise<Usuario> {
    return this.usuarioRepository.findOneBy({ id });
  }

  async obtenerUnoPorNombre(
    nombre_usuario: string,
  ): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOneBy({ nombre_usuario });
  }

  async actualizar(
    id: string,
    actualizarUsuario: Partial<Usuario>,
  ): Promise<Usuario> {
    await this.usuarioRepository.update(id, actualizarUsuario);
    return this.obtenerUno(id);
  }

  // Eliminar un usuario
  async eliminar(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
