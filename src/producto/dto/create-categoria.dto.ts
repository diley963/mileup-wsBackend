import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre de la categoría', example: 'Bebidas' })
  nombre: string;
}