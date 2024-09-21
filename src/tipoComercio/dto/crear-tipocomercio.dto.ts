import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearTipoComercioDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Descripción del tipo de comercio', example: 'Tienda de ropa' })
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'nombre corto', example: 'TiendaRopa' })
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'ruta url', example: '/TiendaRopa' })
  path: string;
}
