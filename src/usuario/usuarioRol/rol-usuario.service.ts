import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolUsuario } from './rolUsuario.entity';
import { CreateRolUsuarioDto } from '../dto/crear-rol-usuario-dto';
import { EditarRolUsuarioDto } from '../dto/editar-rol-usuario.dto';

@Injectable()
export class RolUsuarioService {
  constructor(
    @InjectRepository(RolUsuario)
    private readonly rolUsuarioRepository: Repository<RolUsuario>,
  ) {}

  // Crear un nuevo RolUsuario
  async create(createRolUsuarioDto: CreateRolUsuarioDto): Promise<RolUsuario> {
    const { usuarioId, rolId } = createRolUsuarioDto;

    // Validar si el RolUsuario ya existe
    const exists = await this.rolUsuarioRepository.findOne({ where: { usuarioId, rolId } });
    if (exists) {
      throw new BadRequestException('El RolUsuario ya existe.');
    }

    const rolUsuario = this.rolUsuarioRepository.create(createRolUsuarioDto);
    return this.rolUsuarioRepository.save(rolUsuario);
  }

  // Obtener todos los RolUsuario
  async findAll(): Promise<RolUsuario[]> {
    return this.rolUsuarioRepository.find({ relations: ['usuario', 'rol'] });
  }

  // Obtener un RolUsuario por usuarioId y rolId
  async findOne(usuarioId: string, rolId: string): Promise<RolUsuario> {
    const rolUsuario = await this.rolUsuarioRepository.findOne({ where: { usuarioId, rolId }, relations: ['usuario', 'rol'] });

    if (!rolUsuario) {
      throw new NotFoundException(`RolUsuario con usuarioId ${usuarioId} y rolId ${rolId} no encontrado.`);
    }

    return rolUsuario;
  }

  // Actualizar un RolUsuario
  async update(usuarioId: string, rolId: string, updateRolUsuarioDto: EditarRolUsuarioDto): Promise<RolUsuario> {
    const rolUsuario = await this.findOne(usuarioId, rolId); // Llama al findOne para validar existencia

    Object.assign(rolUsuario, updateRolUsuarioDto);
    return this.rolUsuarioRepository.save(rolUsuario);
  }

  // Eliminar un RolUsuario
  async remove(usuarioId: string, rolId: string): Promise<void> {
    const rolUsuario = await this.findOne(usuarioId, rolId); // Verifica que el registro existe antes de eliminar
    await this.rolUsuarioRepository.delete({ usuarioId, rolId });
  }
}
