import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto, UpdateUsuarioDto } from './usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  // Crear un nuevo usuario
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.usuariosRepository.create(createUsuarioDto);
    return this.usuariosRepository.save(nuevoUsuario);
  }

  // Obtener todos los usuarios
  findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  // Buscar un usuario por ID
  findOne(id: string): Promise<Usuario> {
    return this.usuariosRepository.findOneBy({ id });
  }

  // Buscar un usuario por nombre de usuario
  async findByUsername(nombre_usuario: string): Promise<Usuario | undefined> {
    return this.usuariosRepository.findOneBy({ nombre_usuario });
  }

  // Actualizar un usuario
  async update(id: string, updateUsuario: Partial<Usuario>): Promise<Usuario> {
    await this.usuariosRepository.update(id, updateUsuario);
    return this.findOne(id);
  }

  // Eliminar un usuario
  async remove(id: string): Promise<void> {
    await this.usuariosRepository.delete(id);
  }
}