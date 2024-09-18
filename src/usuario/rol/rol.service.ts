import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async crearRol(nombre: string): Promise<Rol> {
    const rol = this.rolRepository.create({ nombre });
    return this.rolRepository.save(rol);
  }

  async obtenerTodos(): Promise<Rol[]> {
    return this.rolRepository.find();
  }

  async obtenerPorId(id: string): Promise<Rol> {
    return this.rolRepository.findOneBy({ id });
  }

  async actualizarRol(id: string, nombre: string): Promise<Rol> {
    await this.rolRepository.update(id, { nombre });
    return this.rolRepository.findOneBy({ id });
  }

  async eliminarRol(id: string): Promise<void> {
    await this.rolRepository.delete(id);
  }
}
