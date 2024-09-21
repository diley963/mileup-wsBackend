import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoInformacionContacto } from './TipoInformacionContacto.entity';

@Injectable()
export class TipoInformacionContactoService {
  constructor(
    @InjectRepository(TipoInformacionContacto)
    private readonly tipoInformacionContactoRepository: Repository<TipoInformacionContacto>,
  ) {}

  findAll(): Promise<TipoInformacionContacto[]> {
    return this.tipoInformacionContactoRepository.find();
  }

  findOne(id: string): Promise<TipoInformacionContacto> {
    return this.tipoInformacionContactoRepository.findOne({ where: { id } });
  }

  create(tipoInformacionContacto: Partial<TipoInformacionContacto>): Promise<TipoInformacionContacto> {
    return this.tipoInformacionContactoRepository.save(tipoInformacionContacto);
  }

  async update(id: string, updateData: Partial<TipoInformacionContacto>): Promise<TipoInformacionContacto> {
    await this.tipoInformacionContactoRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.tipoInformacionContactoRepository.delete(id);
  }
}
