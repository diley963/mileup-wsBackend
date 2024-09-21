import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditarTipoComercioDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Descripción actualizada del tipo de comercio', example: 'Farmacia' })
  descripcion?: string;
}
