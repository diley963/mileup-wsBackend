import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolUsuarioService } from './rol-usuario.service';
import { CreateRolUsuarioDto } from '../dto/crear-rol-usuario-dto';
import { EditarRolUsuarioDto } from '../dto/editar-rol-usuario.dto';

@ApiTags('RolUsuario')
@Controller('rol-usuario')
export class RolUsuarioController {
  constructor(private readonly rolUsuarioService: RolUsuarioService) {}

  // Crear un nuevo RolUsuario
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo RolUsuario' })
  @ApiResponse({ status: 201, description: 'RolUsuario creado con éxito.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createRolUsuarioDto: CreateRolUsuarioDto) {
    return this.rolUsuarioService.create(createRolUsuarioDto);
  }

  // Obtener todos los RolUsuario
  @Get()
  @ApiOperation({ summary: 'Obtener todos los RolUsuario' })
  @ApiResponse({ status: 200, description: 'Lista de RolUsuarios.' })
  findAll() {
    return this.rolUsuarioService.findAll();
  }

  // Obtener un RolUsuario por usuarioId y rolId
  @Get(':usuarioId/:rolId')
  @ApiOperation({ summary: 'Obtener un RolUsuario por usuarioId y rolId' })
  @ApiResponse({ status: 200, description: 'RolUsuario encontrado.' })
  @ApiResponse({ status: 404, description: 'RolUsuario no encontrado.' })
  findOne(@Param('usuarioId') usuarioId: string, @Param('rolId') rolId: string) {
    return this.rolUsuarioService.findOne(usuarioId, rolId);
  }

  // Actualizar un RolUsuario
  @Put(':usuarioId/:rolId')
  @ApiOperation({ summary: 'Actualizar un RolUsuario' })
  @ApiResponse({ status: 200, description: 'RolUsuario actualizado con éxito.' })
  @ApiResponse({ status: 404, description: 'RolUsuario no encontrado.' })
  update(
    @Param('usuarioId') usuarioId: string,
    @Param('rolId') rolId: string,
    @Body() updateRolUsuarioDto: EditarRolUsuarioDto,
  ) {
    return this.rolUsuarioService.update(usuarioId, rolId, updateRolUsuarioDto);
  }

  // Eliminar un RolUsuario
  @Delete(':usuarioId/:rolId')
  @ApiOperation({ summary: 'Eliminar un RolUsuario' })
  @ApiResponse({ status: 200, description: 'RolUsuario eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'RolUsuario no encontrado.' })
  remove(@Param('usuarioId') usuarioId: string, @Param('rolId') rolId: string) {
    return this.rolUsuarioService.remove(usuarioId, rolId);
  }
}
