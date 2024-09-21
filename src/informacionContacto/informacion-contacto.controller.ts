import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InformacionContactoService } from './informacion-contacto.service';
import { CreateInformacionContactoDto } from './dto/crear-informacion-contacto.dto';
import { UpdateInformacionContactoDto } from './dto/editar-informacion-contacto.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Información de Contacto')
@Controller('informacion-contacto')
export class InformacionContactoController {
  constructor(private readonly informacionContactoService: InformacionContactoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las informaciones de contacto' })
  async obtenerTodas() {
    return this.informacionContactoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una información de contacto por ID' })
  async obtenerPorId(@Param('id') id: string) {
    return this.informacionContactoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva información de contacto' })
  async crear(@Body() createDto: CreateInformacionContactoDto) {
    return this.informacionContactoService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una información de contacto existente' })
  async actualizar(@Param('id') id: string, @Body() updateDto: UpdateInformacionContactoDto) {
    return this.informacionContactoService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una información de contacto por ID' })
  async eliminar(@Param('id') id: string) {
    return this.informacionContactoService.remove(id);
  }
}
