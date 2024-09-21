import { IsOptional, IsString, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditarCiudadDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Nombre de la ciudad', example: 'Medellín' })
  nombre?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: 'ID del departamento al que pertenece la ciudad', example: '1be434cf-382f-4ef6-9c4f-8e6fb2cfe3d5' })
  departamentoId?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Estado de vigencia de la ciudad', example: false })
  vigente?: boolean;  // Campo de vigente
}
