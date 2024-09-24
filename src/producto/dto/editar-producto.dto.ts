import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class EditarProductoDto {
  @ApiPropertyOptional({ description: 'Nombre del producto', example: 'Hamburguesa Actualizada' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ description: 'Precio del producto', example: 19000 })
  @IsOptional()
  @IsNumber()
  precio?: number;

  @ApiPropertyOptional({ description: 'Descripción del producto', example: 'Hamburguesa con doble carne y queso' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'Descuento aplicado al producto', example: 15 })
  @IsOptional()
  @IsNumber()
  descuento?: number;

  @ApiPropertyOptional({ description: 'URL de la foto del producto', example: 'https://ejemplo.com/foto-actualizada.jpg' })
  @IsOptional()
  @IsString()
  imagenUrl?: string;
}
