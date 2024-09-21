import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse,ApiBearerAuth } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';

@ApiTags('usuarios')
@ApiBearerAuth() // Indica que esta ruta requiere JWT
@Controller('usuario')
//@UseGuards(AuthGuard('jwt'))
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crear(@Body() crearUsuarioDto: CrearUsuarioDto) {
    try {
      const usuario = await this.usuarioService.crear(crearUsuarioDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Usuario creado exitosamente',
        data: usuario,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Error al crear el usuario',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  obtenerTodos() {
    return this.usuarioService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.usuarioService.obtenerUno(id);
  }

  @Put(':id')
  actualizar(
    @Param('id') id: string,
    @Body() actualizarUsuarioDto: ActualizarUsuarioDto,
  ) {
    return this.usuarioService.actualizar(id, actualizarUsuarioDto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.usuarioService.eliminar(id);
  }
}
