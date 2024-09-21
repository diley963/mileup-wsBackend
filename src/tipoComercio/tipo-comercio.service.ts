import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoComercio } from './tipo-comercio.entity';
import { CrearTipoComercioDto } from './dto/crear-tipocomercio.dto';
import { EditarTipoComercioDto } from './dto/editar-tipocomercio.dto';

@Injectable()
export class TipoComercioService {
  constructor(
    @InjectRepository(TipoComercio)
    private readonly tipoComercioRepositorio: Repository<TipoComercio>,
  ) {}

  async crear(crearTipoComercioDto: CrearTipoComercioDto): Promise<TipoComercio> {
    const tipoComercio = this.tipoComercioRepositorio.create(crearTipoComercioDto);
    return await this.tipoComercioRepositorio.save(tipoComercio);
  }

  async consultarTodos(): Promise<TipoComercio[]> {
    return await this.tipoComercioRepositorio.find();
  }

  async consultarId(id: string): Promise<TipoComercio> {
    const tipoComercio = await this.tipoComercioRepositorio.findOneBy({ id });
    if (!tipoComercio) {
      throw new NotFoundException(`Tipo de comercio con id ${id} no encontrado`);
    }
    return tipoComercio;
  }

  async actualizar(id: string, editarTipoComercioDto: EditarTipoComercioDto): Promise<TipoComercio> {
    const tipoComercio = await this.consultarId(id);
    Object.assign(tipoComercio, editarTipoComercioDto);
    return await this.tipoComercioRepositorio.save(tipoComercio);
  }

  async eliminar(id: string): Promise<void> {
    const tipoComercio = await this.consultarId(id);
    await this.tipoComercioRepositorio.remove(tipoComercio);
  }
}

