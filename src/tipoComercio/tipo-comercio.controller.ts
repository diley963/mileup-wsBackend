import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TipoComercioService } from './tipo-comercio.service';
import { CrearTipoComercioDto } from './dto/crear-tipocomercio.dto';
import { EditarTipoComercioDto } from './dto/editar-tipocomercio.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tipo-comercio')
@Controller('tipo-comercio')
export class TipoComercioController {
  constructor(private readonly tipoComercioServicio: TipoComercioService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de comercio' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de comercio obtenida correctamente' })
  encontrarTodos() {
    return this.tipoComercioServicio.consultarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de comercio por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de comercio encontrado' })
  encontrarUno(@Param('id') id: string) {
    return this.tipoComercioServicio.consultarId(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo tipo de comercio' })
  @ApiResponse({ status: 201, description: 'Tipo de comercio creado correctamente' })
  crear(@Body() crearTipoComercioDto: CrearTipoComercioDto) {
    return this.tipoComercioServicio.crear(crearTipoComercioDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un tipo de comercio por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de comercio actualizado correctamente' })
  actualizar(@Param('id') id: string, @Body() editarTipoComercioDto: EditarTipoComercioDto) {
    return this.tipoComercioServicio.actualizar(id, editarTipoComercioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un tipo de comercio por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de comercio eliminado correctamente' })
  eliminar(@Param('id') id: string) {
    return this.tipoComercioServicio.eliminar(id);
  }
}
