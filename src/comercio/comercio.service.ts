import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
      relations: ['usuario', 'informacionContactos', 'informacionContactos.tipoInformacion', 'tipoComercio', 'productos', 'ciudad'],
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

    const comercios = await this.comercioRepositorio.find({
      where: { tipoComercioId},
      relations: ['usuario', 'informacionContactos', 'informacionContactos.tipoInformacion', 'tipoComercio', 'productos', 'ciudad'],
    });  
  
    if (!comercios.length) {
      throw new NotFoundException(`No se encontraron comercios para el tipo de comercio con id ${tipoComercioId}`);
    }
    
    return comercios;
  }

  async consultarPorTipoComercioYCiudad(
      tipoComercioId?: string, // Opcional
      ciudadId?: string, // Opcional
    ): Promise<Comercio[]> {
    
      // Verificar si al menos uno de los parámetros está presente
      if (!tipoComercioId && !ciudadId) {
        throw new BadRequestException('Debe proporcionar al menos un tipo de comercio o una ciudad para realizar la consulta.');
      }
      
    
      const query = this.comercioRepositorio.createQueryBuilder('comercio')
        .leftJoinAndSelect('comercio.usuario', 'usuario')
        .leftJoinAndSelect('comercio.tipoComercio', 'tipoComercio')
        .leftJoinAndSelect('comercio.informacionContactos', 'informacionContactos')
        .leftJoinAndSelect('informacionContactos.tipoInformacion', 'tipoInformacion')
        .leftJoinAndSelect('comercio.productos', 'productos') 
        .leftJoinAndSelect('comercio.ciudad', 'ciudad');  
        
      if (tipoComercioId) {
        query.andWhere('tipoComercio.id = :tipoComercioId', { tipoComercioId });
      }
    
      if (ciudadId) {
        query.andWhere('ciudad.id = :ciudadId', { ciudadId });
      }
    
      const comercios = await query.getMany();
    
      if (!comercios.length) {
        throw new NotFoundException('No se encontraron comercios para los criterios proporcionados.');
      }
    
      return comercios;
  }

  
}
