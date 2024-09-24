import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditarTipoComercioDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Descripción actualizada del tipo de comercio', example: 'Farmacia' })
  descripcion?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'nombre corto', example: 'tiendaropa' })
  nombre: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'ruta url', example: '/tiendaropa' })
  path: string;
}
