import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InformacionContacto } from './informacionContacto.entity';
import { CreateInformacionContactoDto } from './dto/crear-informacion-contacto.dto';
import { UpdateInformacionContactoDto } from './dto/editar-informacion-contacto.dto';
import { Comercio } from '../comercio/comercio.entity';
import { TipoInformacionContacto } from '../tipoInformacionContacto/TipoInformacionContacto.entity';

@Injectable()
export class InformacionContactoService {
  constructor(
    @InjectRepository(InformacionContacto)
    private readonly informacionContactoRepository: Repository<InformacionContacto>,

    @InjectRepository(Comercio)
    private readonly comercioRepository: Repository<Comercio>,

    @InjectRepository(TipoInformacionContacto)
    private readonly tipoInformacionContactoRepository: Repository<TipoInformacionContacto>,
  ) {}

  async findAll(): Promise<InformacionContacto[]> {
    return this.informacionContactoRepository.find({
      relations: ['comercio', 'tipoInformacion'], // Carga las relaciones
    });
  }

  async findOne(id: string): Promise<InformacionContacto> {
    const contacto = await this.informacionContactoRepository.findOne({
      where: { id },
      relations: ['comercio', 'tipoInformacion'],
    });
    if (!contacto) {
      throw new NotFoundException(`Información de contacto con ID ${id} no encontrada`);
    }
    return contacto;
  }

  async create(createDto: CreateInformacionContactoDto): Promise<InformacionContacto> {
    const { comercioId, tipoInformacionId, valor } = createDto;

    const comercio = await this.comercioRepository.findOne({ where: { id: comercioId } });
    if (!comercio) {
      throw new NotFoundException(`Comercio con ID ${comercioId} no encontrado`);
    }

    const tipoInformacion = await this.tipoInformacionContactoRepository.findOne({ where: { id: tipoInformacionId } });
    if (!tipoInformacion) {
      throw new NotFoundException(`Tipo de Información con ID ${tipoInformacionId} no encontrado`);
    }

    const nuevoContacto = this.informacionContactoRepository.create({
      valor,
      comercio,
      tipoInformacion,
    });
    return this.informacionContactoRepository.save(nuevoContacto);
  }

  async update(id: string, updateDto: UpdateInformacionContactoDto): Promise<InformacionContacto> {
    const contacto = await this.findOne(id);

    if (updateDto.comercioId) {
      const comercio = await this.comercioRepository.findOne({ where: { id: updateDto.comercioId } });
      if (!comercio) {
        throw new NotFoundException(`Comercio con ID ${updateDto.comercioId} no encontrado`);
      }
      contacto.comercio = comercio;
    }

    if (updateDto.tipoInformacionId) {
      const tipoInformacion = await this.tipoInformacionContactoRepository.findOne({ where: { id: updateDto.tipoInformacionId } });
      if (!tipoInformacion) {
        throw new NotFoundException(`Tipo de Información con ID ${updateDto.tipoInformacionId} no encontrado`);
      }
      contacto.tipoInformacion = tipoInformacion;
    }

    if (updateDto.valor) {
      contacto.valor = updateDto.valor;
    }

    return this.informacionContactoRepository.save(contacto);
  }

  async remove(id: string): Promise<void> {
    const contacto = await this.findOne(id);
    await this.informacionContactoRepository.remove(contacto);
  }
}
