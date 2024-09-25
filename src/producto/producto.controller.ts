import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { EditarProductoDto } from './dto/editar-producto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Producto')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoServicio: ProductoService) {}

  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida correctamente.' })
  @Get()
  ConsultarTodos() {
    return this.productoServicio.consultarTodos();
  }

  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @Get(':id')
  ConsultaId(@Param('id') id: string) {
    return this.productoServicio.consultarId(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @Post()
  crear(@Body() crearProductoDto: CrearProductoDto) {
    return this.productoServicio.crear(crearProductoDto);
  }

  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() editarProductoDto: EditarProductoDto) {
    return this.productoServicio.actualizar(id, editarProductoDto);
  }

  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.productoServicio.eliminar(id);
  }
}
