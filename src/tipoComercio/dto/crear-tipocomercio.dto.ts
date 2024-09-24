import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearTipoComercioDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Descripción del tipo de comercio', example: 'Tienda de ropa' })
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'nombre corto', example: 'tiendaropa' })
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'ruta url', example: '/tiendaropa' })
  path: string;
}
