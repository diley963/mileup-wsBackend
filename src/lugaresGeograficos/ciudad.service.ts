import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './ciudad.entity';
import { CrearCiudadDto } from './dto/crear-ciudad.dto';
import { EditarCiudadDto } from './dto/editar-ciudad.dto';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private ciudadRepository: Repository<Ciudad>,
  ) {}

  async crear(crearCiudadDto: CrearCiudadDto): Promise<Ciudad> {
    const ciudad = this.ciudadRepository.create(crearCiudadDto);
    return await this.ciudadRepository.save(ciudad);
  }

  async consultarTodos(): Promise<Ciudad[]> {
    return await this.ciudadRepository.find({
      where: { vigente: true }, // Filtra solo ciudades vigentes
      relations: ['departamento'],
    });
  }
  

  async consultarPorId(id: string): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({ where: { id }, relations: ['departamento'] });
    if (!ciudad) {
      throw new NotFoundException(`Ciudad con ID ${id} no encontrada`);
    }
    return ciudad;
  }

  async actualizar(id: string, editarCiudadDto: EditarCiudadDto): Promise<Ciudad> {
    await this.consultarPorId(id); // Verifica que la ciudad exista
    await this.ciudadRepository.update(id, editarCiudadDto);
    return this.consultarPorId(id); // Retorna la ciudad actualizada
  }

  async eliminar(id: string): Promise<void> {
    const ciudad = await this.consultarPorId(id); // Verifica que la ciudad exista
    await this.ciudadRepository.remove(ciudad);
  }
}
