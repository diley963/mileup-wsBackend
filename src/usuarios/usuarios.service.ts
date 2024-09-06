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

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Crea una nueva instancia de la entidad Usuario a partir del DTO
    const nuevoUsuario = this.usuariosRepository.create(createUsuarioDto);
    return this.usuariosRepository.save(nuevoUsuario);
  }

  findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  findOne(id: string): Promise<Usuario> {
    return this.usuariosRepository.findOneBy({ id });
  }

  async update(id: string, updateUsuario: Partial<Usuario>): Promise<Usuario> {
    await this.usuariosRepository.update(id, updateUsuario);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usuariosRepository.delete(id);
  }
}
