import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TipoInformacionContactoService } from './tipo-informacion-contacto.service';
import { CreateTipoInformacionContactoDto } from './dto/crear-tipo-informacion-contacto.dto';
import { UpdateTipoInformacionContactoDto } from './dto/editar-tipo-informacion-contacto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


@ApiTags('Tipo Información Contacto')
@Controller('tipo-informacion-contacto')
export class TipoInformacionContactoController {
  constructor(private readonly tipoInformacionContactoService: TipoInformacionContactoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de información de contacto' })
  async obtenerTodos() {
    return await this.tipoInformacionContactoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de información de contacto por ID' })
  async obtenerPorId(@Param('id') id: string) {
    return await this.tipoInformacionContactoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo tipo de información de contacto' })
  async crear(@Body() createTipoInformacionContactoDto: CreateTipoInformacionContactoDto) {
    return await this.tipoInformacionContactoService.create(createTipoInformacionContactoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un tipo de información de contacto existente' })
  async actualizar(@Param('id') id: string, @Body() updateTipoInformacionContactoDto: UpdateTipoInformacionContactoDto) {
    return await this.tipoInformacionContactoService.update(id, updateTipoInformacionContactoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un tipo de información de contacto' })
  async eliminar(@Param('id') id: string) {
    return await this.tipoInformacionContactoService.remove(id);
  }
}