import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CrearCiudadDto } from './dto/crear-ciudad.dto';
import { EditarCiudadDto } from './dto/editar-ciudad.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('ciudad')
@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @ApiOperation({ summary: 'Obtener todas las ciudades' })
  @ApiResponse({ status: 200, description: 'Lista de ciudades obtenida correctamente.' })
  @Get()
  async consultarTodos() {
    return this.ciudadService.consultarTodos();
  }

  @ApiOperation({ summary: 'Obtener una ciudad por ID' })
  @ApiResponse({ status: 200, description: 'Ciudad encontrada.' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada.' })
  @Get(':id')
  async consultarPorId(@Param('id') id: string) {
    return this.ciudadService.consultarPorId(id);
  }

  @ApiOperation({ summary: 'Crear una nueva ciudad' })
  @ApiResponse({ status: 201, description: 'Ciudad creada correctamente.' })
  @Post()
  async crear(@Body() crearCiudadDto: CrearCiudadDto) {
    return this.ciudadService.crear(crearCiudadDto);
  }

  @ApiOperation({ summary: 'Actualizar una ciudad' })
  @ApiResponse({ status: 200, description: 'Ciudad actualizada correctamente.' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada.' })
  @Patch(':id')
  async actualizar(@Param('id') id: string, @Body() editarCiudadDto: EditarCiudadDto) {
    return this.ciudadService.actualizar(id, editarCiudadDto);
  }

  @ApiOperation({ summary: 'Eliminar una ciudad' })
  @ApiResponse({ status: 200, description: 'Ciudad eliminada correctamente.' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada.' })
  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return this.ciudadService.eliminar(id);
  }
}
