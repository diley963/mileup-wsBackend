import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ComercioService } from './comercio.service';
import { CrearComercioDto } from './dto/crear-comercio.dto';
import { EditarComercioDto } from './dto/editar-comercio.dto';
import { ApiTags, ApiOperation, ApiResponse,ApiParam } from '@nestjs/swagger';
import { Ciudad } from 'src/lugaresGeograficos/ciudad.entity';

@ApiTags('comercio')
@Controller('comercio')
export class ComercioController {
  constructor(private readonly comercioServicio: ComercioService) {}

  @ApiOperation({ summary: 'Obtener todos los comercios y su información de contacto' })
  @ApiResponse({ status: 200, description: 'Lista de comercios obtenida correctamente.' })
  @Get()
  ConsultarTodos() {
    return this.comercioServicio.consultarTodos();
  }

  @ApiOperation({ summary: 'Obtener un comercio por ID' })
  @ApiResponse({ status: 200, description: 'Comercio encontrado.' })
  @ApiResponse({ status: 404, description: 'Comercio no encontrado.' })
  @Get(':id')
  ConsultaId(@Param('id') id: string) {
    return this.comercioServicio.consultarId(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo comercio' })
  @ApiResponse({ status: 201, description: 'Comercio creado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @Post()
  crear(@Body() crearComercioDto: CrearComercioDto) {
    return this.comercioServicio.crear(crearComercioDto);
  }

  @ApiOperation({ summary: 'Actualizar un comercio' })
  @ApiResponse({ status: 200, description: 'Comercio actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Comercio no encontrado.' })
  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() editarComercioDto: EditarComercioDto) {
    return this.comercioServicio.actualizar(id, editarComercioDto);
  }

  @ApiOperation({ summary: 'Eliminar un comercio' })
  @ApiResponse({ status: 200, description: 'Comercio eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Comercio no encontrado.' })
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.comercioServicio.eliminar(id);
  }

  @Get('tipo-comercio/:tipoComercioId')
  @ApiOperation({ summary: 'Obtener comercios por ID de tipo de comercio' })
  @ApiResponse({ status: 200, description: 'Lista de comercios obtenida correctamente' })
  async consultaPorTipoComercio(@Param('tipoComercioId') tipoComercioId?: string) {
    return this.comercioServicio.consultarPorTipoComercio(tipoComercioId);
  }

  @Get('tipo-comercio/:tipoComercioId?/ciudad/:ciudadId')
  @ApiOperation({ summary: 'Obtener comercios por ID de tipo de comercio y ciudad' })
  @ApiResponse({ status: 200, description: 'Lista de comercios obtenida correctamente' })
  @ApiParam({ name: 'tipoComercioId', required: false, description: 'ID del tipo de comercio' })
  @ApiParam({ name: 'ciudadId', required: false, description: 'ID de la ciudad' })
  async consultaPorTipoComercioCiudad(
    @Param('tipoComercioId') tipoComercioId?: string,
    @Param('ciudadId') ciudadId?: string
  ) {
    return this.comercioServicio.consultarPorTipoComercioYCiudad(tipoComercioId, ciudadId);
  }

  

}
