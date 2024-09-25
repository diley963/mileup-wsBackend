import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comercio } from './comercio.entity';
import { CrearComercioDto } from './dto/crear-comercio.dto';
import { EditarComercioDto } from './dto/editar-comercio.dto';

@Injectable()
export class ComercioService {
  constructor(
    @InjectRepository(Comercio)
    private readonly comercioRepositorio: Repository<Comercio>,
  ) {}

  async consultarTodos(): Promise<Comercio[]> {
    return await this.comercioRepositorio.find({
      relations: ['usuario', 'informacionContactos', 'informacionContactos.tipoInformacion', 'tipoComercio', 'productos', 'ciudad'],
    });
  }  

  async consultarId(id: string): Promise<Comercio> {
    const comercio = await this.comercioRepositorio.findOne({
      where: { id },
      relations: ['usuario', 'informacionContactos', 'informacionContactos.tipoInformacion'],
    });
    
    if (!comercio) {
      throw new NotFoundException(`Comercio con id ${id} no encontrado`);
    }
    return comercio;
  }

  async crear(crearComercioDto: CrearComercioDto): Promise<Comercio> {
    const comercio = this.comercioRepositorio.create(crearComercioDto);
    return await this.comercioRepositorio.save(comercio);
  }

  async actualizar(id: string, editarComercioDto: EditarComercioDto): Promise<Comercio> {
    const comercio = await this.consultarId(id);
    Object.assign(comercio, editarComercioDto);
    return await this.comercioRepositorio.save(comercio);
  }

  async eliminar(id: string): Promise<void> {
    const comercio = await this.consultarId(id);
    await this.comercioRepositorio.remove(comercio);
  }

  async consultarPorTipoComercio(tipoComercioId: string): Promise<Comercio[]> {
    const comercios = await this.comercioRepositorio.createQueryBuilder('comercio')
      .leftJoinAndSelect('comercio.usuario', 'usuario')
      .leftJoinAndSelect('comercio.tipoComercio', 'tipoComercio')
      .leftJoinAndSelect('comercio.informacionContactos', 'informacionContactos')
      .leftJoinAndSelect('informacionContactos.tipoInformacion', 'tipoInformacion')
      .where('tipoComercio.id = :tipoComercioId', { tipoComercioId })
      .getMany();
  
    if (!comercios.length) {
      throw new NotFoundException(`No se encontraron comercios para el tipo de comercio con id ${tipoComercioId}`);
    }
    
    return comercios;
  }
  
}
