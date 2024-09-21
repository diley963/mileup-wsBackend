import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { EditarProductoDto } from './dto/editar-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepositorio: Repository<Producto>,
  ) {}

  async consultarTodos(): Promise<Producto[]> {
    return await this.productoRepositorio.find({ relations: ['comercio'] });
  }

  async consultarId(id: string): Promise<Producto> {
    const producto = await this.productoRepositorio.findOne({
      where: { id },
      relations: ['comercio'],
    });
    
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  async crear(crearProductoDto: CrearProductoDto): Promise<Producto> {
    const producto = this.productoRepositorio.create(crearProductoDto);
    return await this.productoRepositorio.save(producto);
  }

  async actualizar(id: string, editarProductoDto: EditarProductoDto): Promise<Producto> {
    const producto = await this.consultarId(id);
    Object.assign(producto, editarProductoDto);
    return await this.productoRepositorio.save(producto);
  }

  async eliminar(id: string): Promise<void> {
    const producto = await this.consultarId(id);
    await this.productoRepositorio.remove(producto);
  }
}
