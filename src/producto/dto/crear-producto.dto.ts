import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CrearProductoDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Hamburguesa' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Precio del producto', example: 19.000 })
  @IsNumber()
  precio: number;

  @ApiPropertyOptional({ description: 'Descripción del producto', example: 'Deliciosa hamburguesa con queso y bacon' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: 'Descuento aplicado al producto', example: 10 })
  @IsNumber()
  descuento: number;

  @ApiPropertyOptional({ description: 'URL de la foto del producto', example: 'https://ejemplo.com/foto.jpg' })
  @IsOptional()
  @IsString()
  fotoUrl?: string;

  @ApiProperty({ description: 'ID del comercio asociado', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @IsUUID()
  comercioId: string;
}
