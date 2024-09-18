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
  import { RolService } from './rol.service';
  import { CrearRolDto } from '../dto/crear-rol.dto'; 
  import { ActualizarRolDto } from '../dto/actualizar-rol.dto';
  import { AuthGuard } from '@nestjs/passport'; 
  
  @Controller('roles')
  export class RolController {
    constructor(private readonly rolService: RolService) {}
  
    // Endpoint público: Obtener todos los roles sin autenticación
    @Get()
    obtenerTodos() {
      return this.rolService.obtenerTodos();
    }
  
    // Endpoint protegido: Crear un nuevo rol
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async crear(@Body() crearRolDto: CrearRolDto) {
      try {
        const rol = await this.rolService.crearRol(crearRolDto.nombre);
        return {
          statusCode: HttpStatus.CREATED,
          message: 'Rol creado exitosamente',
          data: rol,
        };
      } catch (error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Error al crear el rol',
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    // Endpoint protegido: Obtener un rol por ID
    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    obtenerPorId(@Param('id') id: string) {
      return this.rolService.obtenerPorId(id);
    }
  
    // Endpoint protegido: Actualizar un rol
    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async actualizar(
      @Param('id') id: string,
      @Body() actualizarRolDto: ActualizarRolDto,
    ) {
      try {
        const rol = await this.rolService.actualizarRol(id, actualizarRolDto.nombre);
        return {
          statusCode: HttpStatus.OK,
          message: 'Rol actualizado exitosamente',
          data: rol,
        };
      } catch (error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Error al actualizar el rol',
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    // Endpoint protegido: Eliminar un rol
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async eliminar(@Param('id') id: string) {
      try {
        await this.rolService.eliminarRol(id);
        return {
          statusCode: HttpStatus.NO_CONTENT,
          message: 'Rol eliminado exitosamente',
        };
      } catch (error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Error al eliminar el rol',
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
  